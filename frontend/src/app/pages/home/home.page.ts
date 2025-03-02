import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public dataService: DataService, private readonly navController: NavController) { }

  showList() {
    this.navController.navigateForward('/question-list');
  }

  goToRemoteQuizzes() {
    this.navController.navigateForward('/remote-quizzes');
  }

  startQuiz() {
    this.navController.navigateForward('/quiz');
  }

}
