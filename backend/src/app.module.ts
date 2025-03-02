import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';
import { typeormConfig } from '../typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), QuizzesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
