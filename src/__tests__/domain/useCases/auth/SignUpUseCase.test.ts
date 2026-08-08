import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { SignUpUseCase } from '../../../../domain/useCases/auth/SignUpUseCase';
import { AuthRepository } from '../../../../domain/repositories/AuthRepository';
import { SignedUpUser } from '../../../../domain/model/SignedUpUser';

function createMockAuthRepository(): AuthRepository {
  return {
    signIn: jest.fn(),
    signInWithToken: jest.fn(),
    signOut: jest.fn(),
    signUp: jest.fn(),
    emailExists: jest.fn(),
  };
}

class SignUpUseCaseTest extends BaseTest<SignUpUseCase> {
  classUnderTest!: SignUpUseCase;
  mockRepo!: AuthRepository;

  beforeEach() {
    this.mockRepo = createMockAuthRepository();
    this.classUnderTest = new SignUpUseCase(this.mockRepo);
  }
}

describe('SignUpUseCase', () => {
  const t = new SignUpUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository sign up with params and returns user', async () => {
    const expectedUser: SignedUpUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
    };
    (t.mockRepo.signUp as jest.Mock).mockResolvedValue(expectedUser);

    await test({
      whenAction: () =>
        t.classUnderTest.execute({
          name: 'John',
          email: 'john@example.com',
          password: 'Test123!',
        }),
      then: result => {
        expect(t.mockRepo.signUp).toHaveBeenCalledWith('John', 'john@example.com', 'Test123!');
        expect(result).toEqual(expectedUser);
      },
    });
  });
});
