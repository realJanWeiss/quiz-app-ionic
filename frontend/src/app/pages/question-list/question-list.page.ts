import { Component, computed } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage {
  readonly isLocalOnly = computed<boolean>(() => this.dataService.currentQuiz().id === '');

  constructor(public dataService: DataService, private readonly navController: NavController) { }

  show(id: string) {
    this.navController.navigateForward(["/question/" + id]);
  }

  public deleteQuestion(question: Question) {
    this.dataService.deleteQuestion(question);
  }

  public publishQuiz() {
    this.dataService.saveRemoteQuiz();
    this.navController.navigateForward(['/']);
  }

  public updateQuiz() {
    this.dataService.updateRemoteQuiz();
    this.navController.navigateForward(['/']);
  }
}
