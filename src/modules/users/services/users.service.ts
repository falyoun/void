import { Injectable } from '@nestjs/common';
import { QueryUsersArgsDto } from '@app/modules/users/queries-types/query-users-args.dto';
import { User, UserDocument } from '@app/modules/users/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserPayload } from '@app/modules/users/payloads/create-user.payload';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(payload: CreateUserPayload) {
    return this.userModel.create(payload);
  }
  async findAll(queryUsersArgsDto: QueryUsersArgsDto) {
    return this.userModel.find();
  }
}
