import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public dataService: DataService, private navController: NavController) {
    console.log(this.dataService.currentQuiz);
  }

  showList() {
    this.navController.navigateForward('/question-list')
  }

}
