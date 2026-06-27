import { RegisteredUser } from '../model/RegisteredUser';

export interface AuthRepository {
  login(email: string, password: string): Promise<RegisteredUser>;
  register(name: string, email: string, password: string): Promise<RegisteredUser>;
  emailExists(email: string): Promise<boolean>;
}
