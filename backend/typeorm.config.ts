import { SeedSampleQuiz1730374695369 } from './src/migrations/1730374695369-SeedSampleQuiz';
import { InitDB1730373739967 } from './src/migrations/1730373739967-initDB';
import { QuestionEntity } from './src/quizzes/entities/question.entity';
import { QuizEntity } from './src/quizzes/entities/quiz.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'my-secret-pw',
  database: 'workshop2024',
  entities: [QuizEntity, QuestionEntity],
  synchronize: false,
  migrations: [InitDB1730373739967, SeedSampleQuiz1730374695369],
});
