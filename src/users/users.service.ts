import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Role } from 'src/shared/enum/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create({ email, password }: CreateUserDto) {
    const user = this.repo.create({
      email,
      password,
      role: Role.User,
    });

    return this.repo.save(user);
  }

  findOne(email: string) {
    return this.repo.findOneBy({ email });
  }
}
