import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage {

  public question: Question;

  constructor(public dataService: DataService, private readonly route: ActivatedRoute) {
    const questionId = this.route.snapshot.paramMap.get("id") as string;

    this.question = this.dataService.getQuestion(questionId) ?? this.dataService.newQuestion();
  }

  ionViewWillLeave() {
    if (this.question.id === '0' && this.question.title !== '') {
      this.dataService.addQuestion(this.question);
    }
    this.dataService.saveLocalQuiz();
  }
}
