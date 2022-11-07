import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'books' })
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  cover?: string;

  @OneToMany(() => Review, (review) => review.book, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Review])
  reviews?: Review[];

  @ManyToMany(() => Category, (category) => category.books, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}
