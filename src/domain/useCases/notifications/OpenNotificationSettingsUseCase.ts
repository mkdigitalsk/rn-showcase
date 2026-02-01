import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { LocalNotificationService } from '../../repositories/LocalNotificationService';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class OpenNotificationSettingsUseCase extends UseCase<void, void> {
  constructor(
    @inject(TYPES.LocalNotificationService) private service: LocalNotificationService,
  ) {
    super();
  }

  protected async run(): Promise<void> {
    return this.service.openSettings();
  }
}
