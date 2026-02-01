import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { LocalNotificationService } from '../../repositories/LocalNotificationService';
import { AppNotification } from '../../model/Notification';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class ShowNotificationUseCase extends UseCase<AppNotification, void> {
  constructor(
    @inject(TYPES.LocalNotificationService) private service: LocalNotificationService,
  ) {
    super();
  }

  protected async run(notification: AppNotification): Promise<void> {
    return this.service.showNotification(notification);
  }
}
