import { WithoutTimestampsAndId } from '@/shared/helpers/types.helper';
import { IUser } from './user.dto';

export namespace IUserRepository {
  export type Insert = (
    params: WithoutTimestampsAndId<IUser>,
  ) => Promise<IUser>;

  export type FindByEmail = (
    email: string,
    returnPassword?: boolean,
  ) => Promise<IUser | null>;

  export type FindById = (id: string) => Promise<IUser | null>;
}
