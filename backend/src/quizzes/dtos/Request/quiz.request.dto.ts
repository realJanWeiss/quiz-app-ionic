import { QuestionRequestDTO } from './question.request.dto';
import { QuizBaseDTO } from '../Base/quiz.base.dto';
import { PickType } from '@nestjs/swagger';

export class QuizRequestDTO extends PickType(QuizBaseDTO, [
  'quizName',
  'questions',
] as const) {
  constructor(quizName: string, questions: QuestionRequestDTO[]) {
    super(); // TODO check if data needs to be passed
    this.quizName = quizName;
    this.questions = questions;
  }
}
