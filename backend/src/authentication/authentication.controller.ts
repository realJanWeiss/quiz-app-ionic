import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GetJwt } from './decorators/jwt.decorator';
import { LoginRequestDTO } from './DTOs/Login.request.dto';
import { RequireAuth } from './decorators/require-auth.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  @ApiOkResponse({
    description: 'Returns the JWT.',
    content: {
      'text/plain': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  public async login(@Body() body: LoginRequestDTO): Promise<string> {
    return this.authenticationService.login(body.email, body.password);
  }

  @Post('/logout')
  @RequireAuth()
  @ApiOkResponse({
    content: {
      'text/plain': {
        schema: {
          type: 'string',
          example: 'true',
        },
      },
    },
  })
  public async logout(@GetJwt() dto: { jwt: string }): Promise<boolean> {
    return this.authenticationService.logout(dto);
  }
}
