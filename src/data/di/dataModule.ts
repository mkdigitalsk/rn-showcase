import { container } from 'tsyringe';
import { UserApi, UserApiImpl } from '../network/UserApi';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserRepositoryImpl } from '../repositories/UserRepositoryImpl';
import { TYPES } from '../../app/diTypes';

export const dataModule = () => {
    container.register<UserApi>(TYPES.UserApi, { useClass: UserApiImpl });
    container.register<UserRepository>(TYPES.UserRepository, { useClass: UserRepositoryImpl });
}
