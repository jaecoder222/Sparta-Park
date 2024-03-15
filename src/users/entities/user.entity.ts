import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Book } from 'src/book/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true }) // 양수만
  id: number;

  /**
   * 이메일
   * @example "example@example.com"
   */
  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  @IsEmail({}, { message: '이메일 형식에 맞지 않습니다.' })
  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  email: string;

  /**
   * 비밀번호
   * @example "Ex@mp1e!!"
   */
  @IsNotEmpty({ message: '비밀번호을 입력해 주세요.' })
  @IsStrongPassword(
    { minLength: 6 },
    {
      message:
        '비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자(!@#$%^&*)를 포함해서 8자리 이상으로 입력해야합니다.',
    },
  )
  @Column({ select: false })
  password: string;

  /**
   * 닉네임
   * @example "고객"
   */
  @IsNotEmpty({ message: '닉네임을 입력해 주세요.' })
  @IsString()
  @Column({ type: 'varchar', length: 20, nullable: false })
  nickname: string;

  @IsNumber()
  @Column({ unsigned: true })
  points: number;

  @IsBoolean()
  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
