import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { DeleteAccountUseCase } from '../../../../domain/useCases/auth/DeleteAccountUseCase';
import { AuthRepository } from '../../../../domain/repositories/AuthRepository';

function createMockAuthRepository(): AuthRepository {
  return {
    signIn: jest.fn(),
    signInWithToken: jest.fn(),
    signOut: jest.fn(),
    deleteAccount: jest.fn().mockResolvedValue(undefined),
    signUp: jest.fn(),
    emailExists: jest.fn(),
  };
}

class DeleteAccountUseCaseTest extends BaseTest<DeleteAccountUseCase> {
  classUnderTest!: DeleteAccountUseCase;
  mockRepo!: AuthRepository;

  beforeEach() {
    this.mockRepo = createMockAuthRepository();
    this.classUnderTest = new DeleteAccountUseCase(this.mockRepo);
  }
}

describe('DeleteAccountUseCase', () => {
  const t = new DeleteAccountUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository deleteAccount', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: () => {
        expect(t.mockRepo.deleteAccount).toHaveBeenCalled();
      },
    });
  });
});
