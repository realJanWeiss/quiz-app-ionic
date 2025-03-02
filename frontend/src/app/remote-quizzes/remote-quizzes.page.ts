import { Component, OnInit } from '@angular/core';
import { QuizResponseDTO } from 'src/api-client';
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

  useRemoteQuiz(quiz: QuizResponseDTO) {
    this.dataService.useRemoteQuiz(quiz.id)
  }

}
