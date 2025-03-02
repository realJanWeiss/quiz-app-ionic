import { QuizBaseDTO } from '../Base/quiz.base.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { QuestionRequestDTO } from '../Request/question.request.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class QuizRequestDTO extends PickType(QuizBaseDTO, [
  'quizName',
] as const) {
  @ApiProperty({ type: () => [QuestionRequestDTO], minItems: 1 })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => QuestionRequestDTO)
  @ValidateNested({ each: true })
  questions: QuestionRequestDTO[];

  constructor(quizName: string, questions: QuestionRequestDTO[]) {
    super(); // TODO check if data needs to be passed
    this.quizName = quizName;
    this.questions = questions;
  }
}
