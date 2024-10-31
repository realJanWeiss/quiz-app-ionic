import { OmitType } from '@nestjs/swagger';
import { QuestionResponseDTO } from './question.response.dto';
import { QuizBaseDTO } from '../Base/quiz.base.dto';

export class QuizResponseDTO extends OmitType(QuizBaseDTO, [] as const) {
  constructor(
    id: string,
    quizName: string,
    createdAt: Date,
    questions: QuestionResponseDTO[],
  ) {
    super(); // TODO check if data needs to be passed
    this.id = id;
    this.quizName = quizName;
    this.createdAt = createdAt;
    this.questions = questions;
  }
}
