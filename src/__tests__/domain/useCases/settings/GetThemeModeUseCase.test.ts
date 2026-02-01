import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { GetThemeModeUseCase } from '../../../../domain/useCases/settings/GetThemeModeUseCase';
import { SettingsRepository } from '../../../../domain/repositories/SettingsRepository';
import { ThemeMode } from '../../../../presentation/foundation/themeMode';

function createMockSettingsRepository(overrides: Partial<SettingsRepository> = {}): SettingsRepository {
  return {
    getThemeMode: jest.fn(() => 'system' as ThemeMode),
    setThemeMode: jest.fn(),
    getLanguage: jest.fn(() => undefined),
    setLanguage: jest.fn(),
    ...overrides,
  };
}

class GetThemeModeUseCaseTest extends BaseTest<GetThemeModeUseCase> {
  classUnderTest!: GetThemeModeUseCase;
  mockRepo!: SettingsRepository;

  beforeEach() {
    this.mockRepo = createMockSettingsRepository();
    this.classUnderTest = new GetThemeModeUseCase(this.mockRepo);
  }
}

describe('GetThemeModeUseCase', () => {
  const t = new GetThemeModeUseCaseTest();
  beforeEach(() => t.setup());

  it('returns light mode from repository', () => {
    test({
      given: () => {
        (t.mockRepo.getThemeMode as jest.Mock).mockReturnValue('light');
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe('light');
        expect(t.mockRepo.getThemeMode).toHaveBeenCalled();
      },
    });
  });

  it('returns dark mode from repository', () => {
    test({
      given: () => {
        (t.mockRepo.getThemeMode as jest.Mock).mockReturnValue('dark');
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => expect(result).toBe('dark'),
    });
  });

  it('returns system mode from repository', () => {
    test({
      given: () => {
        (t.mockRepo.getThemeMode as jest.Mock).mockReturnValue('system');
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => expect(result).toBe('system'),
    });
  });
});
