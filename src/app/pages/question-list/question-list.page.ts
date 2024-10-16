import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage {

  constructor(public dataService: DataService, private readonly navController: NavController) { }

  show(id: string) {
    this.navController.navigateForward(["/question/" + id]);
  }

  public deleteQuestion(question: Question) {
    this.dataService.deleteQuestion(question);
  }

}
