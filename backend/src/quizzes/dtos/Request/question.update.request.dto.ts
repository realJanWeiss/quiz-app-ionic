import { OmitType } from '@nestjs/swagger';
import { QuestionBaseDTO } from '../Base/question.base.dto';

export class QuestionUpdateRequestDTO extends OmitType(
  QuestionBaseDTO,
  [] as const,
) {
  constructor(
    id: string,
    title: string,
    a1: string,
    a2: string,
    a3: string,
    a4: string,
    correct: number,
    sortIdx: number,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.a4 = a4;
    this.correct = correct;
    this.sortIdx = sortIdx;
  }
}
