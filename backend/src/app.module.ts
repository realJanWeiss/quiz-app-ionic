import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './quizzes/entities/quiz.entity';
import { QuestionEntity } from './quizzes/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'my-secret-pw',
      database: 'workshop2024',
      entities: [QuizEntity, QuestionEntity],
      synchronize: false,
    }),
    QuizzesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
