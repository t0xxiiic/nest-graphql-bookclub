import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({ relations: { reviews: true } });
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const existingUser = this.findOne(id);
    return this.userRepository.save({
      ...existingUser,
      ...updateUserInput,
    });
  }

  remove(id: string): Promise<string> {
    return this.findOne(id).then((user) => {
      if (user) {
        this.userRepository
          .delete({ id: id })
          .then(() => `successfully deleted user with id: ${id}`);
      }
      return `could NOT find user with id: ${id}`;
    });
  }
}
