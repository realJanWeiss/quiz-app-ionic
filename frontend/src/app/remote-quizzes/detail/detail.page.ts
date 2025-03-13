import { Component, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizResponseDTO } from 'src/api-client';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  quizId!: string;
  quiz = computed<QuizResponseDTO | undefined>(() =>
    this.dataService.remoteQuizzes()?.find(q => q.id === this.quizId));

  constructor(
    private readonly dataService: DataService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('id') as string;
    this.dataService.fetchRemoteQuizzes()
  }

  useQuiz() {
    this.dataService.useRemoteQuiz(this.quizId)
    this.router.navigate(['/'])
  }
}
