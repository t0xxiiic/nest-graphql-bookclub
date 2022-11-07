import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly bookService: BooksService) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.bookService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books', nullable: true })
  findAll(
    @Args({ name: 'page', type: () => Int }) page: number,
    @Args({ name: 'limit', type: () => Int }) limit: number,
  ) {
    return this.bookService.findAll(page, limit).then((value) => value.items);
  }

  @Query(() => Book, { name: 'book', nullable: true })
  findOne(@Args('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => String)
  removeBook(@Args('id') id: string) {
    return this.bookService.remove(id);
  }

  @Mutation(() => Book)
  addBookCategory(
    @Args('categoryId') categoryId: string,
    @Args('bookId') bookId: string,
  ) {
    return this.bookService.addCategory(categoryId, bookId);
  }
}
