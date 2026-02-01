import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../app/diTypes';
import { SettingsRepository } from '../../repositories/SettingsRepository';
import { ThemeMode } from '../../../presentation/foundation/themeMode';

@injectable()
export class GetThemeModeUseCase {
  constructor(
    @inject(TYPES.SettingsRepository) private settingsRepository: SettingsRepository,
  ) {}

  execute(): ThemeMode {
    return this.settingsRepository.getThemeMode();
  }
}
