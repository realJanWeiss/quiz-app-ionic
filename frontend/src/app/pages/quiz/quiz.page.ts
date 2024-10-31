import { Component, computed, effect, signal, untracked } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/Question';
import { Quiz } from 'src/app/services/Quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage {

  quiz = signal<Quiz | undefined>(undefined);
  points = signal(0);
  currentQuestionIndex = signal(0);

  currentQuestion = computed<Question | undefined>(() => {
    return this.quiz()?.questions[this.currentQuestionIndex()];
  });

  currentAnswers = computed<string[]>(() => {
    if (!this.currentQuestion()) return [];
    return [
      this.currentQuestion()!.a1,
      this.currentQuestion()!.a2,
      this.currentQuestion()!.a3,
      this.currentQuestion()!.a4
    ]
  });

  constructor(public dataService: DataService, private readonly toastController: ToastController) {
    const quizLoadingEffect = effect(() => {
      if (this.dataService.loading()) return;
      quizLoadingEffect.destroy();
      untracked(() => {
        this.quiz.set(this.getShuffeledQuiz());
      });
    });

  }

  private getShuffeledQuiz(): Quiz {
    const quiz = { ...this.dataService.currentQuiz() };

    for (let i = quiz.questions.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [quiz.questions[i], quiz.questions[j]] = [quiz.questions[j], quiz.questions[i]];
    }

    return quiz;
  }

  public async submitAnswer(choice: number) {
    if (!this.currentQuestion()) return;

    const answeredCorrectly = this.currentQuestion()!.correct === choice;
    if (answeredCorrectly) {
      this.points.update(value => value + 1);
    }

    this.currentQuestionIndex.update(value => value + 1);

    if (await this.toastController.getTop()) {
      await this.toastController.dismiss();
    }
    const toast = await this.toastController.create(
      answeredCorrectly
        ? {
          color: 'success',
          duration: 2000,
          message: 'Correct!',
          icon: 'happy-outline'
        }
        : {
          color: 'danger',
          duration: 2000,
          message: 'Wrong',
          icon: 'sad-outline'
        }
    );
    await toast.present();
  }


}
