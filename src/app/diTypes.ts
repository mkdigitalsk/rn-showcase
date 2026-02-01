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

  // Platform APIs
  PlatformClient: Symbol.for('PlatformClient'),
  PlatformRepository: Symbol.for('PlatformRepository'),
  ShareUseCase: Symbol.for('ShareUseCase'),
  DialUseCase: Symbol.for('DialUseCase'),
  OpenLinkUseCase: Symbol.for('OpenLinkUseCase'),
  SendEmailUseCase: Symbol.for('SendEmailUseCase'),
  CopyToClipboardUseCase: Symbol.for('CopyToClipboardUseCase'),

  // Location
  LocationClient: Symbol.for('LocationClient'),
  LocationRepository: Symbol.for('LocationRepository'),
  GetLocationUseCase: Symbol.for('GetLocationUseCase'),

  // Biometric
  BiometricClient: Symbol.for('BiometricClient'),
  BiometricRepository: Symbol.for('BiometricRepository'),
  IsBiometricEnabledUseCase: Symbol.for('IsBiometricEnabledUseCase'),
  AuthenticateWithBiometricUseCase: Symbol.for('AuthenticateWithBiometricUseCase'),

  // Flashlight
  FlashlightClient: Symbol.for('FlashlightClient'),
  FlashlightRepository: Symbol.for('FlashlightRepository'),
  IsFlashlightAvailableUseCase: Symbol.for('IsFlashlightAvailableUseCase'),
  ToggleFlashlightUseCase: Symbol.for('ToggleFlashlightUseCase'),

  // Database
  DatabaseClient: Symbol.for('DatabaseClient'),
  NoteRepository: Symbol.for('NoteRepository'),
  SearchNotesUseCase: Symbol.for('SearchNotesUseCase'),
  InsertNoteUseCase: Symbol.for('InsertNoteUseCase'),
  DeleteNoteUseCase: Symbol.for('DeleteNoteUseCase'),
  DeleteAllNotesUseCase: Symbol.for('DeleteAllNotesUseCase'),

  // Calendar
  DateRepository: Symbol.for('DateRepository'),
  GetTodayDateUseCase: Symbol.for('GetTodayDateUseCase'),

  // Notifications
  LocalNotificationService: Symbol.for('LocalNotificationService'),
  GetPermissionStatusUseCase: Symbol.for('GetPermissionStatusUseCase'),
  RequestPermissionUseCase: Symbol.for('RequestPermissionUseCase'),
  ShowNotificationUseCase: Symbol.for('ShowNotificationUseCase'),
  CancelAllNotificationsUseCase: Symbol.for('CancelAllNotificationsUseCase'),
  OpenNotificationSettingsUseCase: Symbol.for('OpenNotificationSettingsUseCase'),
};
