import { QuizBaseDTO } from '../Base/quiz.base.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { QuestionUpdateRequestDTO } from './question.update.request.dto';

export class QuizUpdateRequestDTO extends PickType(QuizBaseDTO, [
  'id',
  'quizName',
] as const) {
  @ApiProperty({ type: () => [QuestionUpdateRequestDTO], minItems: 1 })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => QuestionUpdateRequestDTO)
  @ValidateNested({ each: true })
  questions: QuestionUpdateRequestDTO[];

  constructor(quizName: string, questions: QuestionUpdateRequestDTO[]) {
    super();
    this.id = this.id;
    this.quizName = quizName;
    this.questions = questions;
  }
}
