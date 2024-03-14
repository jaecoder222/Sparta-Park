import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_CUSTOMER_POINT } from 'src/constants/point.constant';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
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

    const user = await this.userRepository.save({
      email,
      password,
      nickname,
      points: DEFAULT_CUSTOMER_POINT,
    });
    delete user.password;

    return user;
  }
}
