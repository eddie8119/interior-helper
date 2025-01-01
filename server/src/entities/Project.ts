import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './Base';
import { User } from './User';
import { Task } from './Task';

export enum ProjectType {
  RESIDENTIAL = 'residential',
  LUXURY = 'luxury',
  COMMERCIAL = 'commercial',
  OFFICE = 'office',
}

export interface Container {
  id: string;
  type: string;
  order: number;
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

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', nullable: true })
  startDate?: string;

  @Column({ type: 'varchar', nullable: true })
  endDate?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget?: number;

  @Column({ type: 'float', default: 0 })
  progress: number;

  @Column({ type: 'integer', nullable: true })
  daysLeft?: number;

  @Column({ type: 'json', default: [] })
  containers: Container[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  editedAt: Date;

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
