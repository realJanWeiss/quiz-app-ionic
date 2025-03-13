import { v4 as uuid } from 'uuid';
import { Injectable, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Quiz } from './Quiz';
import { Question } from './Question';
import { QuestionRequestDTO, QuestionUpdateRequestDTO, QuizRequestDTO, QuizResponseDTO, QuizUpdateRequestDTO, QuizzesService } from '../../api-client';

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
    this.saveLocalQuiz();
  }

  private async loadLocalQuiz() {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    if (value) {
      try {
        const data = JSON.parse(value);
        this.currentQuiz.set(data);
      } catch (e) {}
    }
    this.loading.set(false);
  }

  public saveLocalQuiz() {
    Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(this.currentQuiz())
    });
  }

  private quizRequestFromQuiz(quiz: Quiz): QuizRequestDTO {
    return {
      questions: quiz.questions.map((q, i) => this.questionRequestFromQuestion(q, i)),
      quizName: quiz.quizName
    };
  }

  private quizUpdateRequestFromQuiz(quiz: Quiz): QuizUpdateRequestDTO {
    return {
      id: quiz.id,
      questions: quiz.questions.map((q, i) => this.questionUpdateRequestFromQuestion(q, i)),
      quizName: quiz.quizName
    };
  }

  private questionRequestFromQuestion(question: Question, sortIdx: number): QuestionRequestDTO {
    return {
      title: question.title,
      a1: question.a1,
      a2: question.a2,
      a3: question.a3,
      a4: question.a4,
      correct: question.correct,
      sortIdx
    }
  }

  private questionUpdateRequestFromQuestion(question: Question, sortIdx: number): QuestionUpdateRequestDTO {
    return {
      ...this.questionRequestFromQuestion(question, sortIdx),
      id: question.id
    }
  }

  public saveRemoteQuiz() {
    this.quizzesService.quizzesControllerInsertNewQuizWithQuestions(
      this.quizRequestFromQuiz(this.currentQuiz())
    ).subscribe((savedQuiz) => {
      this.currentQuiz.set(savedQuiz);
      this.saveLocalQuiz();
      this.fetchRemoteQuizzes()
    })
  }

  public updateRemoteQuiz() {
    this.quizzesService.quizzesControllerUpdateQuizWithQuestions(
      this.quizUpdateRequestFromQuiz(this.currentQuiz())
    ).subscribe((savedQuiz) => {
      this.currentQuiz.set(savedQuiz);
      this.saveLocalQuiz();
      this.fetchRemoteQuizzes()
    })
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

    this.saveLocalQuiz();
  }

  public deleteQuestion(question: Question) {
    const index = this.currentQuiz().questions.indexOf(question);
    if (index > -1) {
      this.currentQuiz().questions.splice(index, 1);
    }

    this.saveLocalQuiz();
  }
}
