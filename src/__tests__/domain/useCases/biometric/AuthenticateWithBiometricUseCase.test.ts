import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { AuthenticateWithBiometricUseCase } from '../../../../domain/useCases/biometric/AuthenticateWithBiometricUseCase';
import { BiometricRepository, BiometricResult } from '../../../../domain/repositories/BiometricRepository';

function createMockBiometricRepository(): BiometricRepository {
  return {
    isAvailable: jest.fn(),
    authenticate: jest.fn().mockResolvedValue({ type: 'success' }),
  };
}

class AuthenticateWithBiometricUseCaseTest extends BaseTest<AuthenticateWithBiometricUseCase> {
  classUnderTest!: AuthenticateWithBiometricUseCase;
  mockRepo!: BiometricRepository;

  beforeEach() {
    this.mockRepo = createMockBiometricRepository();
    this.classUnderTest = new AuthenticateWithBiometricUseCase(this.mockRepo);
  }
}

describe('AuthenticateWithBiometricUseCase', () => {
  const t = new AuthenticateWithBiometricUseCaseTest();
  beforeEach(() => t.setup());

  it('returns success when authentication succeeds', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toEqual({ type: 'success' });
        expect(t.mockRepo.authenticate).toHaveBeenCalled();
      },
    });
  });

  it('returns failed when authentication fails', async () => {
    const expected: BiometricResult = { type: 'failed', message: 'Too many attempts' };

    await test({
      given: () => {
        (t.mockRepo.authenticate as jest.Mock).mockResolvedValue(expected);
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toEqual(expected);
      },
    });
  });

  it('returns cancelled when user cancels', async () => {
    await test({
      given: () => {
        (t.mockRepo.authenticate as jest.Mock).mockResolvedValue({ type: 'cancelled' });
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toEqual({ type: 'cancelled' });
      },
    });
  });

  it('returns not_available when biometric not available', async () => {
    await test({
      given: () => {
        (t.mockRepo.authenticate as jest.Mock).mockResolvedValue({ type: 'not_available' });
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toEqual({ type: 'not_available' });
      },
    });
  });
});
