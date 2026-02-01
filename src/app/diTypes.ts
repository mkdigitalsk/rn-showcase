export const TYPES = {
  UserApi: Symbol.for('UserApi'),
  UserRepository: Symbol.for('UserRepository'),
  GetUsersUseCase: Symbol.for('GetUsersUseCase'),

  // Storage
  SessionPreferences: Symbol.for('SessionPreferences'),
  PersistentPreferences: Symbol.for('PersistentPreferences'),
  StorageLocalStore: Symbol.for('StorageLocalStore'),
  StorageRepository: Symbol.for('StorageRepository'),
  LoadStorageDataUseCase: Symbol.for('LoadStorageDataUseCase'),
  ObserveStorageDataUseCase: Symbol.for('ObserveStorageDataUseCase'),
  SetSessionCounterUseCase: Symbol.for('SetSessionCounterUseCase'),
  SetPersistentCounterUseCase: Symbol.for('SetPersistentCounterUseCase'),
  ClearSessionUseCase: Symbol.for('ClearSessionUseCase'),
};
