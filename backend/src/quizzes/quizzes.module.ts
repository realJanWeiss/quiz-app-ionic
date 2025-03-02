import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { QuestionEntity } from './entities/question.entity';
import { UserEntity } from '../users/entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizEntity, QuestionEntity, UserEntity]),
    JwtModule.register({
      global: true,
      secret:
        'fuoiwehohwqeouhwohfweuohfwouhj2839ru3289qvb88vb48v24bv8p2bv284zbvp2843werjbhfwekj00z',
      signOptions: { expiresIn: '1d' },
    }),
    AuthenticationModule,
  ],
  providers: [QuizzesService, UsersService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
