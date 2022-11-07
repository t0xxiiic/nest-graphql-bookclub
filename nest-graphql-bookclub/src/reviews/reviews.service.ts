import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createReviewInput: CreateReviewInput) {
    const book: Book = await this.bookRepository.findOne({
      where: { id: createReviewInput.bookId },
    });
    const user = await this.userRepository.findOne({
      where: { id: createReviewInput.userId },
    });
    return this.reviewRepository.save({
      comment: createReviewInput.comment,
      book: book,
      user: user,
    });
  }

  async findAll() {
    return await this.reviewRepository.find({
      relations: { user: true, book: true },
    });
  }

  findOne(id: string) {
    return this.reviewRepository.findOne({ where: { id: id } });
  }

  async update(
    id: string,
    updateReviewInput: UpdateReviewInput,
  ): Promise<Review> {
    const existingReview = await this.findOne(id);
    existingReview.book = await this.bookRepository.findOne({
      where: { id: updateReviewInput.bookId },
    });
    existingReview.user = await this.userRepository.findOne({
      where: { id: updateReviewInput.userId },
    });
    return this.reviewRepository.save({
      ...existingReview,
      ...updateReviewInput,
    });
  }

  remove(id: string): Promise<string> {
    return this.findOne(id).then((user) => {
      if (user) {
        this.reviewRepository
          .delete({ id: id })
          .then(() => `successfully deleted review with id: ${id}`);
      }
      return `could NOT find review with id: ${id}`;
    });
  }
}
