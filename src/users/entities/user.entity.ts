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

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  nickName: string;

  @Column({ unsigned: true })
  points: number;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
