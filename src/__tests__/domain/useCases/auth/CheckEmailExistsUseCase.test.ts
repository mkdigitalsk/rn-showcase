import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { CheckEmailExistsUseCase } from '../../../../domain/useCases/auth/CheckEmailExistsUseCase';
import { AuthRepository } from '../../../../domain/repositories/AuthRepository';

function createMockAuthRepository(): AuthRepository {
  return {
    register: jest.fn(),
    emailExists: jest.fn(),
  };
}

class CheckEmailExistsUseCaseTest extends BaseTest<CheckEmailExistsUseCase> {
  classUnderTest!: CheckEmailExistsUseCase;
  mockRepo!: AuthRepository;

  beforeEach() {
    this.mockRepo = createMockAuthRepository();
    this.classUnderTest = new CheckEmailExistsUseCase(this.mockRepo);
  }
}

describe('CheckEmailExistsUseCase', () => {
  const t = new CheckEmailExistsUseCaseTest();
  beforeEach(() => t.setup());

  it('returns true when email exists', async () => {
    (t.mockRepo.emailExists as jest.Mock).mockResolvedValue(true);

    await test({
      whenAction: () => t.classUnderTest.execute('existing@example.com'),
      then: (result) => {
        expect(t.mockRepo.emailExists).toHaveBeenCalledWith('existing@example.com');
        expect(result).toBe(true);
      },
    });
  });

  it('returns false when email does not exist', async () => {
    (t.mockRepo.emailExists as jest.Mock).mockResolvedValue(false);

    await test({
      whenAction: () => t.classUnderTest.execute('new@example.com'),
      then: (result) => {
        expect(t.mockRepo.emailExists).toHaveBeenCalledWith('new@example.com');
        expect(result).toBe(false);
      },
    });
  });
});
