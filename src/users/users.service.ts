import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignInUserDto } from './dtos/signin-user.dto';
import { Role } from 'src/shared/enum/role.enum';
import { SignUpUserDto } from './dtos/signup-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create({ email, password }: SignInUserDto) {
    const user = this.repo.create({ email, password, role: Role.User });
    return this.repo.save(user);
  }

  async findOne({ email, password }: SignUpUserDto) {
    const user = await this.repo.findOneBy({ email });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
