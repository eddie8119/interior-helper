import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Task } from './Task';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column({ type: 'float', default: 0 })
  progress: number;

  @Column({ nullable: true })
  daysLeft: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  editedAt: Date;

  @ManyToOne(() => User, user => user.projects)
  user: User;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];
}
