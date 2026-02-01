import { container } from 'tsyringe';
import { GetUsersUseCase } from '../../domain/useCases/GetUsersUseCase';
import { LoadStorageDataUseCase } from '../../domain/useCases/storage/LoadStorageDataUseCase';
import { ObserveStorageDataUseCase } from '../../domain/useCases/storage/ObserveStorageDataUseCase';
import { SetSessionCounterUseCase } from '../../domain/useCases/storage/SetSessionCounterUseCase';
import { SetPersistentCounterUseCase } from '../../domain/useCases/storage/SetPersistentCounterUseCase';
import { ClearSessionUseCase } from '../../domain/useCases/storage/ClearSessionUseCase';
import { TYPES } from '../diTypes';

export const domainModule = () => {
    container.register<GetUsersUseCase>(TYPES.GetUsersUseCase, { useClass: GetUsersUseCase });

    // Storage
    container.register(TYPES.LoadStorageDataUseCase, { useClass: LoadStorageDataUseCase });
    container.register(TYPES.ObserveStorageDataUseCase, { useClass: ObserveStorageDataUseCase });
    container.register(TYPES.SetSessionCounterUseCase, { useClass: SetSessionCounterUseCase });
    container.register(TYPES.SetPersistentCounterUseCase, { useClass: SetPersistentCounterUseCase });
    container.register(TYPES.ClearSessionUseCase, { useClass: ClearSessionUseCase });
}
