import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { QuestionRequestDTO } from '../dtos/Request/question.request.dto';
import { QuizResponseDTO } from '../dtos/Response/quiz.response.dto';
import { QuestionResponseDTO } from '../dtos/Response/question.response.dto';

@Entity('quizzes')
export class QuizEntity {
  constructor(quizName: string, questions: QuestionEntity[]) {
    this.quizName = quizName;
    this.questions = questions;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  quizName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn()
  version: number;

  @OneToMany(() => QuestionEntity, (question) => question.quiz, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  questions: QuestionEntity[];

  public static mapToEntity(
    quizName: string,
    questions: QuestionRequestDTO[],
  ): QuizEntity {
    const questionEntities: QuestionEntity[] = questions.map(
      (question) =>
        new QuestionEntity(
          question.title,
          question.a1,
          question.a2,
          question.a3,
          question.a4,
          question.correct,
          question.sortIdx,
        ),
    );

    return new QuizEntity(quizName, questionEntities);
  }

  public mapToDTO(): QuizResponseDTO {
    const questionsDTO = this.questions.map(
      (question) =>
        new QuestionResponseDTO(
          question.id,
          question.title,
          question.a1,
          question.a2,
          question.a3,
          question.a4,
          question.correct,
          question.sortIdx,
        ),
    );
    questionsDTO.sort((a, b) => a.sortIdx - b.sortIdx);
    return new QuizResponseDTO(
      this.id,
      this.quizName,
      this.created_at,
      questionsDTO,
    );
  }
}
