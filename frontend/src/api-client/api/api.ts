export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './quizzes.service';
import { QuizzesService } from './quizzes.service';
export const APIS = [AuthenticationService, QuizzesService];
