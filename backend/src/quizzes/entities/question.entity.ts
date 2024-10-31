import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { QuizEntity } from './quiz.entity';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  a1: string;
  @Column()
  a2: string;
  @Column()
  a3: string;
  @Column()
  a4: string;
  @Column()
  correct: number;
  @Column()
  sortIdx: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn()
  version: number;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions, {})
  quiz: QuizEntity;

  constructor(
    title: string,
    a1: string,
    a2: string,
    a3: string,
    a4: string,
    correct: number,
    sortIdx: number,
  ) {
    this.title = title;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.a4 = a4;
    this.correct = correct;
    this.sortIdx = sortIdx;
  }
}
