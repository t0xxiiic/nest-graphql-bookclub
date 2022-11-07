import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryInput: CreateCategoryInput) {
    const newCategory = this.categoryRepository.create(createCategoryInput);
    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find({ relations: { books: true } });
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({ where: { id: id } });
  }

  async update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const existingCategory = await this.findOne(id);
    existingCategory.name = updateCategoryInput.name;
    return this.categoryRepository.save(existingCategory);
  }

  remove(id: string): Promise<string> {
    return this.findOne(id).then((user) => {
      if (user) {
        this.categoryRepository
          .delete({ id: id })
          .then(() => `successfully deleted category with id: ${id}`);
      }
      return `could NOT find category with id: ${id}`;
    });
  }
}
