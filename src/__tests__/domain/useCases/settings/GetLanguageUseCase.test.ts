import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { GetLanguageUseCase } from '../../../../domain/useCases/settings/GetLanguageUseCase';
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

class GetLanguageUseCaseTest extends BaseTest<GetLanguageUseCase> {
  classUnderTest!: GetLanguageUseCase;
  mockRepo!: SettingsRepository;

  beforeEach() {
    this.mockRepo = createMockSettingsRepository();
    this.classUnderTest = new GetLanguageUseCase(this.mockRepo);
  }
}

describe('GetLanguageUseCase', () => {
  const t = new GetLanguageUseCaseTest();
  beforeEach(() => t.setup());

  it('returns undefined when no language stored', () => {
    test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => expect(result).toBeUndefined(),
    });
  });

  it('returns en from repository', () => {
    test({
      given: () => {
        (t.mockRepo.getLanguage as jest.Mock).mockReturnValue('en');
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => expect(result).toBe('en'),
    });
  });

  it('returns sk from repository', () => {
    test({
      given: () => {
        (t.mockRepo.getLanguage as jest.Mock).mockReturnValue('sk');
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => expect(result).toBe('sk'),
    });
  });
});
