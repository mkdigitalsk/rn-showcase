import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { SetThemeModeUseCase } from '../../../../domain/useCases/settings/SetThemeModeUseCase';
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

class SetThemeModeUseCaseTest extends BaseTest<SetThemeModeUseCase> {
  classUnderTest!: SetThemeModeUseCase;
  mockRepo!: SettingsRepository;

  beforeEach() {
    this.mockRepo = createMockSettingsRepository();
    this.classUnderTest = new SetThemeModeUseCase(this.mockRepo);
  }
}

describe('SetThemeModeUseCase', () => {
  const t = new SetThemeModeUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with light mode', () => {
    test({
      whenAction: () => t.classUnderTest.execute('light'),
      then: () => {
        expect(t.mockRepo.setThemeMode).toHaveBeenCalledWith('light');
      },
    });
  });

  it('calls repository with dark mode', () => {
    test({
      whenAction: () => t.classUnderTest.execute('dark'),
      then: () => {
        expect(t.mockRepo.setThemeMode).toHaveBeenCalledWith('dark');
      },
    });
  });

  it('calls repository with system mode', () => {
    test({
      whenAction: () => t.classUnderTest.execute('system'),
      then: () => {
        expect(t.mockRepo.setThemeMode).toHaveBeenCalledWith('system');
      },
    });
  });
});
