import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { QuestionEntity } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity, QuestionEntity])],
  providers: [QuizzesService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
