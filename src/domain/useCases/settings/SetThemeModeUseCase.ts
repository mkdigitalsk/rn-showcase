import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../app/diTypes';
import { SettingsRepository } from '../../repositories/SettingsRepository';
import { ThemeMode } from '../../../presentation/foundation/themeMode';

@injectable()
export class SetThemeModeUseCase {
  constructor(
    @inject(TYPES.SettingsRepository) private settingsRepository: SettingsRepository,
  ) {}

  execute(mode: ThemeMode): void {
    this.settingsRepository.setThemeMode(mode);
  }
}
