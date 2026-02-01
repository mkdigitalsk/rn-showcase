import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { User } from '../../domain/models/User';
import { UserApi } from '../network/UserApi';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { TYPES } from '../../app/diTypes';
import { mapAll } from '../base/Mapper';
import { UserMapper } from '../mappers/UserMapper';

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject(TYPES.UserApi) private api: UserApi) {}

  async getUsers(): Promise<User[]> {
    const dtos = await this.api.fetchUsers();
    return mapAll(UserMapper, dtos);
  }
}
