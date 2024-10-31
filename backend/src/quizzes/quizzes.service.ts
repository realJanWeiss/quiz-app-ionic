import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { QuizRequestDTO } from './dtos/Request/quiz.request.dto';
import { QuizResponseDTO } from './dtos/Response/quiz.response.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
  ) {}

  public async getAllQuizzes(): Promise<QuizResponseDTO[]> {
    return (await this.quizRepository.find()).map((quizEntity) =>
      quizEntity.mapToDTO(),
    );
  }

  public async insertNewQuiz(quiz: QuizRequestDTO): Promise<QuizResponseDTO> {
    const quizEntity = QuizEntity.mapToEntity(quiz.quizName, quiz.questions);
    return (await this.quizRepository.save(quizEntity)).mapToDTO();
  }
}
