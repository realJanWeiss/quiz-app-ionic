import { ApiProperty, PickType } from '@nestjs/swagger';
import { QuestionResponseDTO } from './question.response.dto';
import { QuizBaseDTO } from '../Base/quiz.base.dto';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class QuizResponseDTO extends PickType(QuizBaseDTO, [
  'id',
  'quizName',
  'createdAt',
] as const) {
  @ApiProperty({ type: () => [QuestionResponseDTO], minItems: 1 })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => QuestionResponseDTO)
  @ValidateNested({ each: true })
  questions: QuestionResponseDTO[];

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
