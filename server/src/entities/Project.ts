import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './Base';
import { User } from './User';
import { Task } from './Task';

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ProjectType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  INDUSTRIAL = 'industrial',
  RENOVATION = 'renovation',
}

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: ProjectType,
    default: ProjectType.RESIDENTIAL,
  })
  type: ProjectType;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING,
  })
  status: ProjectStatus;

  @Column({ type: 'float', default: 0 })
  progress: number;

  @Column({ type: 'integer', nullable: true })
  daysLeft?: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  actualCost: number;

  @Column({ type: 'json', nullable: true })
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  @Column({ type: 'simple-array', nullable: true })
  tags?: string[];

  @ManyToOne(() => User, user => user.projects)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];

  // 計算項目進度
  calculateProgress(): void {
    if (!this.tasks?.length) {
      this.progress = 0;
      return;
    }

    const completedTasks = this.tasks.filter(task => task.status === 'done').length;
    this.progress = (completedTasks / this.tasks.length) * 100;
  }

  // 計算剩餘天數
  calculateDaysLeft(): void {
    if (!this.endDate) {
      this.daysLeft = undefined;  
      return;
    }

    const today = new Date();
    const end = new Date(this.endDate);
    const diffTime = Math.abs(end.getTime() - today.getTime());
    this.daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
