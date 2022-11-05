import { WithoutTimestampsAndId } from '@/shared/helpers/types.helper';
import { IUserRepository } from '../dto/user-repository.dto';
import { UserRepository } from '../database/user.repository';
import { IUser } from '../dto/user.dto';

export class UserRepositoryMock implements UserRepository {
  private db: IUser[] = [];

  resetDatabase() {
    this.db = [];
  }

  insert: IUserRepository.Insert = async (
    params: WithoutTimestampsAndId<IUser>,
  ) => {
    const data: IUser = {
      ...params,
      _id: String(this.db.length + 1),
      createdAt: new Date(),
    };
    this.db.push(data);
    return data;
  };

  findByEmail: IUserRepository.FindByEmail = async (
    email: string,
    returnPassword?: boolean,
  ) => {
    const data = this.db.find((current) => current.email === email);
    if (!data) {
      return null;
    }
    if (returnPassword) return data;
    if (data.password) delete data.password;
    return data;
  };

  findById: IUserRepository.FindById = async (id: string) => {
    return this.db.find((current) => current._id === id);
  };
}
