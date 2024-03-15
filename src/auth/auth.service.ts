import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_CUSTOMER_POINT } from 'src/constants/point.constant';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp({ email, password, passwordConfirm, nickname }) {
    const isPasswordMatched = password === passwordConfirm;
    if (!isPasswordMatched)
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      );

    const existedUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existedUser)
      throw new BadRequestException('이미 가입된 이메일 입니다.');

    const hashRound = this.configService.get<number>('PASSWORD_HASH_ROUND');
    const hashedPassword = bcrypt.hashSync(password, hashRound);

    const user = await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
      points: DEFAULT_CUSTOMER_POINT,
    });
    delete user.password;

    return user;
  }

  async signIn(userId: string) {
    // jwt 토큰을 생성
  }

  async validateUser({ email, password }: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    const isPasswordMatched = bcrypt.compareSync(
      password,
      user?.password ?? '',
    );

    if (!user || !isPasswordMatched) {
      return null;
    }

    return { id: user.id };
  }
}
