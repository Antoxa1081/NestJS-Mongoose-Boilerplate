import * as crypto from 'crypto';
import * as util from 'util';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

const pbkdf2 = util.promisify(crypto.pbkdf2);

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).select('+password +salt');
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async createCrypto(
    plainPassword: string,
  ): Promise<{ salt: string; password: string }> {
    const salt = crypto.randomBytes(128).toString('base64');

    const password = (
      await pbkdf2(plainPassword, salt, 1, 128, 'sha256')
    ).toString();
    return { salt, password };
  }

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const createdUser = new this.userModel({
      username: createUserDto.username,
      ...(await this.createCrypto(createUserDto.password)),
    });

    return createdUser.save();
  }

  async checkPassword(
    password: string,
    passwordHash: string,
    salt: string,
  ): Promise<boolean> {
    return (
      (await pbkdf2(password, salt, 1, 128, 'sha256')).toString() ===
      passwordHash
    );
  }
}
