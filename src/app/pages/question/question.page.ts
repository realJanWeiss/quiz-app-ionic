import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  public question: Question;

  constructor(public dataService: DataService, private route: ActivatedRoute) {
    const questionId = this.route.snapshot.paramMap.get("id") as string;

    this.question = this.dataService.getQuestion(questionId) ?? this.dataService.newQuestion();
    console.log(this.question);
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    if (this.question.id === '0' && this.question.title !== '') {
      this.dataService.addQuestion(this.question);
    }
    this.dataService.saveQuiz();
  }
}
