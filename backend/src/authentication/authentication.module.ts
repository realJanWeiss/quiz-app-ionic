import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret:
        'fuoiwehohwqeouhwohfweuohfwouhj2839ru3289qvb88vb48v24bv8p2bv284zbvp2843werjbhfwekj00z',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
