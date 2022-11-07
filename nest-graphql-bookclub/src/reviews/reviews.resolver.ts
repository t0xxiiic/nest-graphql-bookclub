import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { UsersService } from '../users/users.service';
import { BooksService } from '../books/books.service';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly userService: UsersService,
    private readonly bookService: BooksService,
  ) {}

  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    return this.reviewsService.create(createReviewInput);
  }

  // @ResolveField(() => User)
  // async user(@Parent() review: Review) {
  //   return await this.userService.findOne(review.user.id);
  // }
  //
  // @ResolveField(() => Book)
  // async book(@Parent() review: Review) {
  //   return await this.bookService.findOne(review.book.id);
  // }

  @Query(() => [Review], { name: 'reviews' })
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @Query(() => Review, { name: 'review', nullable: true })
  findOne(@Args('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => Review)
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewsService.update(updateReviewInput.id, updateReviewInput);
  }

  @Mutation(() => String)
  removeReview(@Args('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
