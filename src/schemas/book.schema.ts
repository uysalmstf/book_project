import { Entity, Column, CreateDateColumn, ObjectIdColumn } from "typeorm";
import { ObjectId } from 'mongodb';

@Entity()
export class Book {
  @ObjectIdColumn({ name: '_id' })
  _id: ObjectId;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column()
  category: string;

  @Column({ type: 'text', nullable: false })
  author: string;

  @Column({ type: 'number', nullable: false })
  publish_year: number;

  @Column({ type: 'number', nullable: true, default: 0 })
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn({  nullable: true })
  deletedAt: Date | null;
}