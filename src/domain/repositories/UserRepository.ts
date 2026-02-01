import { User } from '../model/User';

export interface UserRepository {
  getUsers(): Promise<User[]>;
}
