import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInUserDto } from './dtos/signin-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userSevice: UsersService,
    private jwtService: JwtService,
  ) {}

  async create({ email, password }: SignUpUserDto) {
    // Check if email is existed
    const existedUser = await this.userSevice.findOne(email);
    if (existedUser) {
      throw new BadRequestException('User is existed');
    }

    // Generate random salt
    const salt = randomBytes(8).toString('hex');

    // Hash password with generated salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Concatenate salt and password
    const hashedPassword = salt + '.' + hash.toString('hex');

    // Save user
    const user = await this.userSevice.create({
      email,
      password: hashedPassword,
    });

    return this.generateAccessToken(user);
  }

  async findOne({ email, password }: SignInUserDto) {
    // Check if user is existed
    const user = await this.userSevice.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }

    // Get salt and hash password
    const [salt, storedHash] = user.password.split('.');

    // Hash password with stored salt
    const hash = ((await scrypt(password, salt, 32)) as Buffer).toString('hex');

    // Compare user hashed password with stored hashed password
    if (hash !== storedHash) {
      throw new BadRequestException('Password does not match');
    }

    return this.generateAccessToken(user);
  }

  async generateAccessToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
