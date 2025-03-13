import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-remote-quizzes',
  templateUrl: './remote-quizzes.page.html',
  styleUrls: ['./remote-quizzes.page.scss'],
})
export class RemoteQuizzesPage implements OnInit {

  constructor(protected readonly dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchRemoteQuizzes()
  }

}
