import { container } from 'tsyringe';
import { UserApi, UserApiImpl } from '../network/UserApi';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserRepositoryImpl } from '../repositories/UserRepositoryImpl';
import { SessionPreferencesImpl } from '../local/SessionPreferences';
import { PersistentPreferencesImpl } from '../local/PersistentPreferences';
import { StorageLocalStoreImpl } from '../local/StorageLocalStore';
import { StorageRepositoryImpl } from '../repositories/StorageRepositoryImpl';
import { PlatformClient } from '../platform/PlatformClient';
import { PlatformRepositoryImpl } from '../repositories/PlatformRepositoryImpl';
import { LocationClient } from '../location/LocationClient';
import { LocationRepositoryImpl } from '../repositories/LocationRepositoryImpl';
import { BiometricClient } from '../biometric/BiometricClient';
import { BiometricRepositoryImpl } from '../repositories/BiometricRepositoryImpl';
import { FlashlightClient } from '../flashlight/FlashlightClient';
import { FlashlightRepositoryImpl } from '../repositories/FlashlightRepositoryImpl';
import { AuthRepositoryImpl } from '../repositories/AuthRepositoryImpl';
import { DatabaseClient } from '../database/DatabaseClient';
import { NoteRepositoryImpl } from '../repositories/NoteRepositoryImpl';
import { DateRepositoryImpl } from '../repositories/DateRepositoryImpl';
import { NotificationClient } from '../notification/NotificationClient';
import { SettingsRepositoryImpl } from '../repositories/SettingsRepositoryImpl';
import { FirebaseAnalyticsClient } from '../analytics/FirebaseAnalyticsClient';
import { TYPES } from '../../app/diTypes';

export const dataModule = () => {
    container.register<UserApi>(TYPES.UserApi, { useClass: UserApiImpl });
    container.register<UserRepository>(TYPES.UserRepository, { useClass: UserRepositoryImpl });

    // Storage
    container.registerSingleton(TYPES.SessionPreferences, SessionPreferencesImpl);
    container.registerSingleton(TYPES.PersistentPreferences, PersistentPreferencesImpl);
    container.registerSingleton(TYPES.StorageLocalStore, StorageLocalStoreImpl);
    container.registerSingleton(TYPES.StorageRepository, StorageRepositoryImpl);

    // Platform APIs
    container.registerSingleton(TYPES.PlatformClient, PlatformClient);
    container.registerSingleton(TYPES.PlatformRepository, PlatformRepositoryImpl);

    // Location
    container.registerSingleton(TYPES.LocationClient, LocationClient);
    container.registerSingleton(TYPES.LocationRepository, LocationRepositoryImpl);

    // Biometric
    container.registerSingleton(TYPES.BiometricClient, BiometricClient);
    container.registerSingleton(TYPES.BiometricRepository, BiometricRepositoryImpl);

    // Flashlight
    container.registerSingleton(TYPES.FlashlightClient, FlashlightClient);
    container.registerSingleton(TYPES.FlashlightRepository, FlashlightRepositoryImpl);

    // Auth
    container.registerSingleton(TYPES.AuthRepository, AuthRepositoryImpl);

    // Database
    container.registerSingleton(TYPES.DatabaseClient, DatabaseClient);
    container.registerSingleton(TYPES.NoteRepository, NoteRepositoryImpl);

    // Analytics
    container.registerSingleton(TYPES.AnalyticsClient, FirebaseAnalyticsClient);

    // Calendar
    container.registerSingleton(TYPES.DateRepository, DateRepositoryImpl);

    // Settings
    container.registerSingleton(TYPES.SettingsRepository, SettingsRepositoryImpl);

    // Notifications
    container.registerSingleton(TYPES.LocalNotificationService, NotificationClient);
}
