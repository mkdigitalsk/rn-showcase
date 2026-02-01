import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { LocalNotificationService } from '../../repositories/LocalNotificationService';
import { PushPermissionStatus } from '../../model/Notification';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class RequestPermissionUseCase extends UseCase<void, PushPermissionStatus> {
  constructor(
    @inject(TYPES.LocalNotificationService) private service: LocalNotificationService,
  ) {
    super();
  }

  protected async run(): Promise<PushPermissionStatus> {
    return this.service.requestPermission();
  }
}
