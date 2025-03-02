import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/User.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  private blackListedJWTs: string[] = [];
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly JWTService: JwtService,
  ) {}

  public async login(email: string, password: string): Promise<string> {
    // Existiert der User hinter der Email ?
    // Password matched hashed Password aus der Entity
    // Wenn nein -> Fehler
    // Wenn ja -> JWT signieren und retournieren
    const userFromDB = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!userFromDB)
      throw new BadRequestException(`Username or password wrong`);
    const isPasswordValid = await userFromDB.validatePassword(password);
    if (!isPasswordValid)
      throw new BadRequestException(`Username or password wrong`);
    return await this.JWTService.signAsync({ userID: userFromDB.id });
  }

  public async logout(dto: { jwt: string }): Promise<boolean> {
    this.blackListedJWTs.push(dto.jwt);
    return true;
  }

  public getBlackListedJWTs(): string[] {
    return this.blackListedJWTs;
  }
}
