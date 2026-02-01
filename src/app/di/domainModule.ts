import { container } from 'tsyringe';
import { GetUsersUseCase } from '../../domain/useCases/GetUsersUseCase';
import { LoadStorageDataUseCase } from '../../domain/useCases/storage/LoadStorageDataUseCase';
import { ObserveStorageDataUseCase } from '../../domain/useCases/storage/ObserveStorageDataUseCase';
import { SetSessionCounterUseCase } from '../../domain/useCases/storage/SetSessionCounterUseCase';
import { SetPersistentCounterUseCase } from '../../domain/useCases/storage/SetPersistentCounterUseCase';
import { ClearSessionUseCase } from '../../domain/useCases/storage/ClearSessionUseCase';
import { ShareUseCase } from '../../domain/useCases/platform/ShareUseCase';
import { DialUseCase } from '../../domain/useCases/platform/DialUseCase';
import { OpenLinkUseCase } from '../../domain/useCases/platform/OpenLinkUseCase';
import { SendEmailUseCase } from '../../domain/useCases/platform/SendEmailUseCase';
import { CopyToClipboardUseCase } from '../../domain/useCases/platform/CopyToClipboardUseCase';
import { GetLocationUseCase } from '../../domain/useCases/location/GetLocationUseCase';
import { IsBiometricEnabledUseCase } from '../../domain/useCases/biometric/IsBiometricEnabledUseCase';
import { AuthenticateWithBiometricUseCase } from '../../domain/useCases/biometric/AuthenticateWithBiometricUseCase';
import { IsFlashlightAvailableUseCase } from '../../domain/useCases/flashlight/IsFlashlightAvailableUseCase';
import { ToggleFlashlightUseCase } from '../../domain/useCases/flashlight/ToggleFlashlightUseCase';
import { SearchNotesUseCase } from '../../domain/useCases/notes/SearchNotesUseCase';
import { InsertNoteUseCase } from '../../domain/useCases/notes/InsertNoteUseCase';
import { DeleteNoteUseCase } from '../../domain/useCases/notes/DeleteNoteUseCase';
import { DeleteAllNotesUseCase } from '../../domain/useCases/notes/DeleteAllNotesUseCase';
import { GetTodayDateUseCase } from '../../domain/useCases/calendar/GetTodayDateUseCase';
import { GetPermissionStatusUseCase } from '../../domain/useCases/notifications/GetPermissionStatusUseCase';
import { RequestPermissionUseCase } from '../../domain/useCases/notifications/RequestPermissionUseCase';
import { ShowNotificationUseCase } from '../../domain/useCases/notifications/ShowNotificationUseCase';
import { CancelAllNotificationsUseCase } from '../../domain/useCases/notifications/CancelAllNotificationsUseCase';
import { OpenNotificationSettingsUseCase } from '../../domain/useCases/notifications/OpenNotificationSettingsUseCase';
import { TYPES } from '../diTypes';

export const domainModule = () => {
    container.register<GetUsersUseCase>(TYPES.GetUsersUseCase, { useClass: GetUsersUseCase });

    // Storage
    container.register(TYPES.LoadStorageDataUseCase, { useClass: LoadStorageDataUseCase });
    container.register(TYPES.ObserveStorageDataUseCase, { useClass: ObserveStorageDataUseCase });
    container.register(TYPES.SetSessionCounterUseCase, { useClass: SetSessionCounterUseCase });
    container.register(TYPES.SetPersistentCounterUseCase, { useClass: SetPersistentCounterUseCase });
    container.register(TYPES.ClearSessionUseCase, { useClass: ClearSessionUseCase });

    // Platform APIs
    container.register(TYPES.ShareUseCase, { useClass: ShareUseCase });
    container.register(TYPES.DialUseCase, { useClass: DialUseCase });
    container.register(TYPES.OpenLinkUseCase, { useClass: OpenLinkUseCase });
    container.register(TYPES.SendEmailUseCase, { useClass: SendEmailUseCase });
    container.register(TYPES.CopyToClipboardUseCase, { useClass: CopyToClipboardUseCase });

    // Location
    container.register(TYPES.GetLocationUseCase, { useClass: GetLocationUseCase });

    // Biometric
    container.register(TYPES.IsBiometricEnabledUseCase, { useClass: IsBiometricEnabledUseCase });
    container.register(TYPES.AuthenticateWithBiometricUseCase, { useClass: AuthenticateWithBiometricUseCase });

    // Flashlight
    container.register(TYPES.IsFlashlightAvailableUseCase, { useClass: IsFlashlightAvailableUseCase });
    container.register(TYPES.ToggleFlashlightUseCase, { useClass: ToggleFlashlightUseCase });

    // Database
    container.register(TYPES.SearchNotesUseCase, { useClass: SearchNotesUseCase });
    container.register(TYPES.InsertNoteUseCase, { useClass: InsertNoteUseCase });
    container.register(TYPES.DeleteNoteUseCase, { useClass: DeleteNoteUseCase });
    container.register(TYPES.DeleteAllNotesUseCase, { useClass: DeleteAllNotesUseCase });

    // Calendar
    container.register(TYPES.GetTodayDateUseCase, { useClass: GetTodayDateUseCase });

    // Notifications
    container.register(TYPES.GetPermissionStatusUseCase, { useClass: GetPermissionStatusUseCase });
    container.register(TYPES.RequestPermissionUseCase, { useClass: RequestPermissionUseCase });
    container.register(TYPES.ShowNotificationUseCase, { useClass: ShowNotificationUseCase });
    container.register(TYPES.CancelAllNotificationsUseCase, { useClass: CancelAllNotificationsUseCase });
    container.register(TYPES.OpenNotificationSettingsUseCase, { useClass: OpenNotificationSettingsUseCase });
}
