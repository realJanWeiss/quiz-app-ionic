import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoteQuizzesPage } from './remote-quizzes.page';

describe('RemoteQuizzesPage', () => {
  let component: RemoteQuizzesPage;
  let fixture: ComponentFixture<RemoteQuizzesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteQuizzesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
