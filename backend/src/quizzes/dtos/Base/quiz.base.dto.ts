import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { QuestionRequestDTO } from '../Request/question.request.dto';

export class QuizBaseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ minLength: 10, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  quizName: string;

  @ApiProperty({ type: () => [QuestionRequestDTO], minItems: 1 })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => QuestionRequestDTO)
  @ValidateNested({ each: true })
  questions: QuestionRequestDTO[];
}
