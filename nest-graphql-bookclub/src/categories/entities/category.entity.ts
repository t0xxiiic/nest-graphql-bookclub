import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Book, (book) => book.categories, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'book_categories' })
  @Field(() => [Book], { nullable: true })
  books?: [Book];
}
