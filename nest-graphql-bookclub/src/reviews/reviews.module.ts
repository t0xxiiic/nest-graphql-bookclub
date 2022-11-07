import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { BooksService } from '../books/books.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Book]),
    forwardRef(() => CategoriesModule),
  ],
  providers: [ReviewsResolver, ReviewsService, UsersService, BooksService],
})
export class ReviewsModule {}
