import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../dto/user-repository.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository {
  insert: IUserRepository.Insert = async (params) => {
    const created = new UserModel(params);
    const result = await created.save();
    delete result.password;
    return result;
  };

  findByEmail: IUserRepository.FindByEmail = async (email, returnPassword) => {
    const result = await UserModel.findOne({ email }).exec();
    if (returnPassword) return result;
    if (result?.password) delete result.password;
    return result;
  };

  findById: IUserRepository.FindById = async (id) => {
    return await UserModel.findById(id).exec();
  };
}
