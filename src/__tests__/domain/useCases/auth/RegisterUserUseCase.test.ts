import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { RegisterUserUseCase } from '../../../../domain/useCases/auth/RegisterUserUseCase';
import { AuthRepository } from '../../../../domain/repositories/AuthRepository';
import { RegisteredUser } from '../../../../domain/model/RegisteredUser';

function createMockAuthRepository(): AuthRepository {
  return {
    register: jest.fn(),
    emailExists: jest.fn(),
  };
}

class RegisterUserUseCaseTest extends BaseTest<RegisterUserUseCase> {
  classUnderTest!: RegisterUserUseCase;
  mockRepo!: AuthRepository;

  beforeEach() {
    this.mockRepo = createMockAuthRepository();
    this.classUnderTest = new RegisterUserUseCase(this.mockRepo);
  }
}

describe('RegisterUserUseCase', () => {
  const t = new RegisterUserUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository register with params and returns user', async () => {
    const expectedUser: RegisteredUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'Test123!',
      createdAt: 1234567890,
    };
    (t.mockRepo.register as jest.Mock).mockResolvedValue(expectedUser);

    await test({
      whenAction: () => t.classUnderTest.execute({
        name: 'John',
        email: 'john@example.com',
        password: 'Test123!',
      }),
      then: (result) => {
        expect(t.mockRepo.register).toHaveBeenCalledWith('John', 'john@example.com', 'Test123!');
        expect(result).toEqual(expectedUser);
      },
    });
  });
});
