import { v4 as uuid } from 'uuid';
import { Injectable, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Quiz } from './Quiz';
import { Question } from './Question';
import { QuizResponseDTO, QuizzesService } from '../../api-client';

const STORAGE_KEY = 'quiz';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentQuiz = signal<Quiz>({
    id: '',
    questions: [],
    quizName: 'mein Quiz',
  });

  public remoteQuizzes = signal<QuizResponseDTO[] | undefined>(undefined);

  loading = signal(true);

  constructor(private readonly quizzesService: QuizzesService) {
    this.loadLocalQuiz();
  }

  public fetchRemoteQuizzes() {
    this.quizzesService.quizzesControllerGetAllQuizzes().subscribe(loadedData => {
      if (loadedData?.length) {
        this.remoteQuizzes.set(loadedData);
      }
    });
  }

  public useRemoteQuiz(quizId: string) {
    const foundQuiz = this.remoteQuizzes()?.find(q => q.id === quizId)
    if (!foundQuiz) return;
    this.currentQuiz.set(foundQuiz);
  }

  private async loadLocalQuiz() {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    if (!value) return;

    try {
      const data = JSON.parse(value);
      this.currentQuiz.set(data);
    } catch (e) {}
    this.loading.set(false);
  }

  public saveQuiz() {
    console.log(JSON.stringify(this.currentQuiz()));
    Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(this.currentQuiz())
    });
  }

  public getQuestion(id: string): Question | undefined {
    return this.currentQuiz().questions.find(q => q.id === id);
  }

  public newQuestion(): Question {
    return {
      id: '0',
      title: '',
      a1: '',
      a2: '',
      a3: '',
      a4: '',
      correct: 1
    }
  }

  public addQuestion(question: Question) {
    question.id = uuid();
    this.currentQuiz().questions.push(question);

    this.saveQuiz();
  }

  public deleteQuestion(question: Question) {
    const index = this.currentQuiz().questions.indexOf(question);
    if (index > -1) {
      this.currentQuiz().questions.splice(index, 1);
    }

    this.saveQuiz();
  }
}
