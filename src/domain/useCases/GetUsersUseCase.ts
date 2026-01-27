import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { TYPES } from '../../app/diTypes';
import { UseCase } from './base/UseCase';

@injectable()
export class GetUsersUseCase extends UseCase<void, User[]> {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {
    super();
  }

  protected async run(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
}
