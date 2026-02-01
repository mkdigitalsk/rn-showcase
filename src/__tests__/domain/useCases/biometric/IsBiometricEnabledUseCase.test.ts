import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { IsBiometricEnabledUseCase } from '../../../../domain/useCases/biometric/IsBiometricEnabledUseCase';
import { BiometricRepository } from '../../../../domain/repositories/BiometricRepository';

function createMockBiometricRepository(): BiometricRepository {
  return {
    isAvailable: jest.fn().mockResolvedValue(false),
    authenticate: jest.fn(),
  };
}

class IsBiometricEnabledUseCaseTest extends BaseTest<IsBiometricEnabledUseCase> {
  classUnderTest!: IsBiometricEnabledUseCase;
  mockRepo!: BiometricRepository;

  beforeEach() {
    this.mockRepo = createMockBiometricRepository();
    this.classUnderTest = new IsBiometricEnabledUseCase(this.mockRepo);
  }
}

describe('IsBiometricEnabledUseCase', () => {
  const t = new IsBiometricEnabledUseCaseTest();
  beforeEach(() => t.setup());

  it('returns true when biometric is available', async () => {
    await test({
      given: () => {
        (t.mockRepo.isAvailable as jest.Mock).mockResolvedValue(true);
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(true);
        expect(t.mockRepo.isAvailable).toHaveBeenCalled();
      },
    });
  });

  it('returns false when biometric is not available', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(false);
      },
    });
  });
});
