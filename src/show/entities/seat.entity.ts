import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  scheduleId: number;

  @Column({ unsigned: true })
  availableSeats: number;

  @Column({ unsigned: true })
  totalSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Schedule, (schedule) => schedule.seat)
  @JoinColumn()
  schedule: Schedule;
}
