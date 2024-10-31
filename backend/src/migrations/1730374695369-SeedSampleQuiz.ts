import { QuizEntity } from '../quizzes/entities/quiz.entity';
import { QuestionEntity } from '../quizzes/entities/question.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSampleQuiz1730374695369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Quiz + Fragen

    const question = new QuestionEntity(
      'SeedFrage 1',
      'funktioniert',
      'funktioniert weniger',
      'funktioniert mäßig',
      'funktioniert gar nicht',
      1,
      1,
    );
    const quiz = new QuizEntity('Quiz 1', [question]);

    await queryRunner.manager.getRepository(QuizEntity).save(quiz);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const quizFromDB = await queryRunner.manager
      .getRepository(QuizEntity)
      .findOne({ where: { quizName: 'Quiz 1' } });
    await queryRunner.manager.getRepository(QuizEntity).delete(quizFromDB.id);
  }
}
