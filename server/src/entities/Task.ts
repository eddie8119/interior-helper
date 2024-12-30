import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { BaseEntity } from './Base';
import { Project } from './Project';
import { User } from './User';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  BLOCKED = 'blocked',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('tasks')
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedHours?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  actualHours: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedCost?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  actualCost: number;

  @Column({ type: 'simple-array', nullable: true })
  attachments?: string[];

  @Column({ type: 'simple-array', nullable: true })
  tags?: string[];

  @ManyToOne(() => Project, project => project.tasks)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigneeId' })
  assignee?: User;

  @Column({ nullable: true })
  assigneeId?: string;

  @Column({ type: 'integer', default: 0 })
  order: number;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  // 虛擬欄位：是否逾期
  isOverdue?: boolean;

  // 虛擬欄位：距離截止日期的天數
  daysUntilDue?: number;

  @AfterLoad()
  calculateFields() {
    // 計算是否逾期
    if (this.dueDate) {
      const now = new Date();
      this.isOverdue = new Date(this.dueDate) < now && this.status !== TaskStatus.DONE;
    }

    // 計算距離截止日期的天數
    if (this.dueDate) {
      const now = new Date();
      const due = new Date(this.dueDate);
      const diffTime = Math.abs(due.getTime() - now.getTime());
      this.daysUntilDue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  validateDates() {
    if (this.dueDate) {
      // 確保截止日期不早於當前日期
      const now = new Date();
      const dueDate = new Date(this.dueDate);
      if (dueDate < now) {
        throw new Error('Due date cannot be in the past');
      }
    }
  }
}
