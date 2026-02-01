import { inject, injectable } from 'tsyringe';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { RegisteredUser } from '../../domain/model/RegisteredUser';
import { DatabaseClient } from '../database/DatabaseClient';
import { TYPES } from '../../app/diTypes';

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @inject(TYPES.DatabaseClient) private client: DatabaseClient,
  ) {}

  async register(name: string, email: string, password: string): Promise<RegisteredUser> {
    const createdAt = Date.now();
    this.client.insertUser(name, email, password, createdAt);
    const user = this.client.selectUserByEmail(email);
    if (!user) {
      throw new Error(`Registration failed: user not found after insert (${email})`);
    }
    return user;
  }

  async emailExists(email: string): Promise<boolean> {
    return this.client.selectUserByEmail(email) !== null;
  }
}
