import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { SeedSampleQuiz1730374695369 } from './src/migrations/1730374695369-SeedSampleQuiz';
import { InitDB1730373739967 } from './src/migrations/1730373739967-initDB';
import { QuestionEntity } from './src/quizzes/entities/question.entity';
import { QuizEntity } from './src/quizzes/entities/quiz.entity';
import { UserEntity } from './src/users/entities/User.entity';
import { CreateUserEntity1739540615787 } from './src/migrations/1739540615787-CreateUserEntity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'my-secret-pw',
  database: 'workshop2024',
  entities: [QuizEntity, QuestionEntity, UserEntity],
  synchronize: false,
  migrations: [
    InitDB1730373739967,
    SeedSampleQuiz1730374695369,
    CreateUserEntity1739540615787,
  ],
};

export default new DataSource(typeormConfig as DataSourceOptions);
