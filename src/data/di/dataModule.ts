import { container } from 'tsyringe';
import { UserApi, UserApiImpl } from '../network/UserApi';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserRepositoryImpl } from '../repositories/UserRepositoryImpl';
import { SessionPreferencesImpl } from '../local/SessionPreferences';
import { PersistentPreferencesImpl } from '../local/PersistentPreferences';
import { StorageLocalStoreImpl } from '../local/StorageLocalStore';
import { StorageRepositoryImpl } from '../repositories/StorageRepositoryImpl';
import { TYPES } from '../../app/diTypes';

export const dataModule = () => {
    container.register<UserApi>(TYPES.UserApi, { useClass: UserApiImpl });
    container.register<UserRepository>(TYPES.UserRepository, { useClass: UserRepositoryImpl });

    // Storage
    container.registerSingleton(TYPES.SessionPreferences, SessionPreferencesImpl);
    container.registerSingleton(TYPES.PersistentPreferences, PersistentPreferencesImpl);
    container.registerSingleton(TYPES.StorageLocalStore, StorageLocalStoreImpl);
    container.registerSingleton(TYPES.StorageRepository, StorageRepositoryImpl);
}
