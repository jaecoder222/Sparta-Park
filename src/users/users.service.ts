import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async signUp(
    user: Pick<User, 'email' | 'password' | 'nickName' | 'isAdmin'>,
  ) {
    const existingUser = await this.UserRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser)
      throw new BadRequestException('이미 가입한 이메일입니다.');

    const existingNickName = await this.UserRepository.findOne({
      where: { nickName: user.nickName },
    });

    if (existingNickName)
      throw new BadRequestException('이미 존재하는 이름입니다.');

    const hashedPasswod = await bcrypt.hash(user.password, 10);

    const userObject = this.UserRepository.create({
      email: user.email,
      password: hashedPasswod,
      nickName: user.nickName,
    });

    const newUser = this.UserRepository.save(userObject);

    return newUser;
  }

  async signIn(email: string) {
    return this.UserRepository.findOne({
      where: { email },
    });
  }

  async findUser() {
    return await this.UserRepository.find();
  }

  removeUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
