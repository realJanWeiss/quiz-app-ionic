import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length, Min, Max } from 'class-validator';

export class QuestionBaseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty({ minLength: 5, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(5, 200)
  title: string;

  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  a1: string;

  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  a2: string;

  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  a3: string;

  @ApiProperty({ minLength: 1, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  a4: string;

  @ApiProperty({ minimum: 1, maximum: 4 })
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  @Max(4)
  correct: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  sortIdx: number;
}
