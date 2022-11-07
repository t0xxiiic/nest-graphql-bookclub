import { Inject, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { UpdateBookInput } from './dto/update-book.input';
import { CreateBookInput } from './dto/create-book.input';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @Inject(CategoriesService)
    private readonly categoryService: CategoriesService,
  ) {}

  create(createBookInput: CreateBookInput) {
    const newBook = this.bookRepository.create(createBookInput);
    return this.bookRepository.save(newBook);
  }

  async findAll(page: number, limit: number) {
    const qb = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.reviews', 'reviews')
      .leftJoinAndSelect('book.categories', 'categories');
    return paginate<Book>(qb, {
      page: page,
      limit: limit,
    });
  }

  findOne(id: string) {
    return this.bookRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateBookInput: UpdateBookInput): Promise<Book> {
    const existingBookResult = this.findOne(id);
    return this.bookRepository.save({
      ...existingBookResult,
      ...updateBookInput,
    });
  }

  remove(id: string): Promise<string> {
    return this.findOne(id).then((user) => {
      if (user) {
        this.bookRepository
          .delete({ id: id })
          .then(() => `successfully deleted book with id: ${id}`);
      }
      return `could NOT find book with id: ${id}`;
    });
  }

  async addCategory(categoryId: string, bookId: string) {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: { categories: true },
    });
    const category = await this.categoryService.findOne(categoryId);
    if (category) {
      let bookCategories = book.categories;
      if (bookCategories) {
        bookCategories.push(category);
      } else {
        bookCategories = [category];
      }
      book.categories = bookCategories;
    }
    return this.bookRepository.save(book);
  }
}
