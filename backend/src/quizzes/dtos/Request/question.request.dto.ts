import { OmitType } from '@nestjs/swagger';
import { QuestionBaseDTO } from '../Base/question.base.dto';

export class QuestionRequestDTO extends OmitType(QuestionBaseDTO, [
  'id',
] as const) {
  constructor(
    title: string,
    a1: string,
    a2: string,
    a3: string,
    a4: string,
    correct: number,
    sortIdx: number,
  ) {
    super();
    this.title = title;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.a4 = a4;
    this.correct = correct;
    this.sortIdx = sortIdx;
  }
}
