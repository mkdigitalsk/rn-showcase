import { RegisteredUser } from '../model/RegisteredUser';

export interface AuthRepository {
  register(name: string, email: string, password: string): Promise<RegisteredUser>;
  emailExists(email: string): Promise<boolean>;
}
