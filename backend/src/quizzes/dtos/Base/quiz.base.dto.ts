import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class QuizBaseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ minLength: 10, maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @Length(10, 200)
  quizName: string;
}
