import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { Role } from './schemas/roles.schema';
import { CreateUserDto } from '@shared/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<User>,
    @InjectModel(Role.name) private rolesModel: Model<Role>,
  ) {}

  async createUser(user: CreateUserDto) {
    const { _id } = await this.rolesModel.findOne({ name: 'user' });
    const createdUser = await this.usersModel.create({ ...user, role: _id });

    await createdUser.save();
  }

  async changeRole(userId: string, roleId: string) {
    const user = await this.usersModel.findOne({ _id: userId });
    if (user === null) {
      throw new BadRequestException('User is not found');
    }
    user.role = roleId;

    await user.save();
  }

  async findOne(email: string) {
    const user = await this.usersModel.findOne({ email });
    if (user === null) {
      return null;
    }

    const populatedUser = await user.populate('role').execPopulate();
    const { _id, password, role } = populatedUser;

    return {
      _id: _id.toString(),
      email,
      password,
      role: role.name,
    };
  }
}
