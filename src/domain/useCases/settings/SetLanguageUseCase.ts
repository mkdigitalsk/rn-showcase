import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../app/diTypes';
import { SettingsRepository } from '../../repositories/SettingsRepository';
import { Language } from '../../../presentation/foundation/strings/StringsProvider';

@injectable()
export class SetLanguageUseCase {
  constructor(
    @inject(TYPES.SettingsRepository) private settingsRepository: SettingsRepository,
  ) {}

  execute(language: Language): void {
    this.settingsRepository.setLanguage(language);
  }
}
