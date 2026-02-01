import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { SetLanguageUseCase } from '../../../../domain/useCases/settings/SetLanguageUseCase';
import { SettingsRepository } from '../../../../domain/repositories/SettingsRepository';
import { ThemeMode } from '../../../../presentation/foundation/themeMode';

function createMockSettingsRepository(): SettingsRepository {
  return {
    getThemeMode: jest.fn(() => 'system' as ThemeMode),
    setThemeMode: jest.fn(),
    getLanguage: jest.fn(() => undefined),
    setLanguage: jest.fn(),
  };
}

class SetLanguageUseCaseTest extends BaseTest<SetLanguageUseCase> {
  classUnderTest!: SetLanguageUseCase;
  mockRepo!: SettingsRepository;

  beforeEach() {
    this.mockRepo = createMockSettingsRepository();
    this.classUnderTest = new SetLanguageUseCase(this.mockRepo);
  }
}

describe('SetLanguageUseCase', () => {
  const t = new SetLanguageUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with en', () => {
    test({
      whenAction: () => t.classUnderTest.execute('en'),
      then: () => {
        expect(t.mockRepo.setLanguage).toHaveBeenCalledWith('en');
      },
    });
  });

  it('calls repository with sk', () => {
    test({
      whenAction: () => t.classUnderTest.execute('sk'),
      then: () => {
        expect(t.mockRepo.setLanguage).toHaveBeenCalledWith('sk');
      },
    });
  });
});
