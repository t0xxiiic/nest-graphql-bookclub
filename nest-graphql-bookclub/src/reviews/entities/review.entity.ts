import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'reviews' })
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(() => Book, (book) => book.reviews, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Book)
  book: Book;

  @ManyToOne(() => User, (user) => user.reviews, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  comment: string;
}
