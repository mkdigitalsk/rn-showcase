import { container } from 'tsyringe';
import { GetUsersUseCase } from '../../domain/useCases/GetUsersUseCase';
import { TYPES } from '../diTypes';

export const domainModule = () => {
    container.register<GetUsersUseCase>(TYPES.GetUsersUseCase, { useClass: GetUsersUseCase });
}
