import { Entity, Column, CreateDateColumn, ObjectIdColumn } from "typeorm";
import { ObjectId } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn({ name: '_id' })
  _id: ObjectId;

  @Column({ type: 'text', nullable: false })
  username: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn({  nullable: true })
  deletedAt: Date | null;
}