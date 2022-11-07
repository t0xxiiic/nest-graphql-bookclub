import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ReviewsService } from '../reviews/reviews.service';
import { Review } from '../reviews/entities/review.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review, Book])],
  providers: [UsersResolver, UsersService, ReviewsService],
})
export class UsersModule {}
