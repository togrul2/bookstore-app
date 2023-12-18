import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ModifyResult } from 'mongoose';

@Injectable()
export class UserRepository {
  public constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async getUsers(): Promise<User[]> {
    return this.userModel.find().select(['-__v']).exec();
  }

  public async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select(['-__v']).exec();
  }

  public async existsByUsername(
    username: string,
    userId: string | null,
  ): Promise<boolean> {
    return !!(await this.userModel.exists({ username, _id: { $ne: userId } }));
  }

  public async existsByEmail(
    email: string,
    userId: string | null,
  ): Promise<boolean> {
    return !!(await this.userModel.exists({ email, _id: { $ne: userId } }));
  }

  public async createUser(createUserDto: Partial<User>): Promise<User> {
    return new this.userModel(createUserDto, ['-__v']).save();
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).select(['-__v']).exec();
  }

  public async updateUser(
    id: string,
    updateUserDto: Partial<User>,
  ): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      fields: ['-__v'],
    });
  }

  public async deleteUser(id: string): Promise<ModifyResult<User>> {
    return this.userModel.findByIdAndDelete(id);
  }
}