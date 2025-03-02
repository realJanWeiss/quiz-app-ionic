import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizRequestDTO } from './dtos/Request/quiz.request.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuizResponseDTO } from './dtos/Response/quiz.response.dto';
import { GetUser } from '../authentication/decorators/user.decorator';
import { UserEntity } from '../users/entities/User.entity';
import { RequireAuth } from '../authentication/decorators/require-auth.decorator';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiOperation({ summary: 'Fetches all quizzes with questions.' })
  @ApiOkResponse({
    description: 'List of all quizzes',
    type: [QuizResponseDTO],
  })
  @Get()
  public getAllQuizzes(): Promise<QuizResponseDTO[]> {
    return this.quizzesService.getAllQuizzes();
  }

  @ApiOperation({ summary: 'Inserts new quiz entity.' })
  @ApiOkResponse({
    description: 'Newly created QuizDTO',
    type: () => QuizResponseDTO,
  })
  @Post()
  @RequireAuth()
  public insertNewQuizWithQuestions(
    @Body() quiz: QuizRequestDTO,
    @GetUser() user: UserEntity,
  ): Promise<QuizResponseDTO> {
    console.log(user);
    return this.quizzesService.insertNewQuiz(quiz);
  }
}
