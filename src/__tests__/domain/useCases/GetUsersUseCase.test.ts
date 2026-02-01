import { BaseTest } from '../../BaseTest';
import { test } from '../../TestFunctions';
import { GetUsersUseCase } from '../../../domain/useCases/GetUsersUseCase';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../domain/model/User';

function createMockUserRepository(): UserRepository {
  return {
    getUsers: jest.fn().mockResolvedValue([]),
  };
}

class GetUsersUseCaseTest extends BaseTest<GetUsersUseCase> {
  classUnderTest!: GetUsersUseCase;
  mockRepo!: UserRepository;

  beforeEach() {
    this.mockRepo = createMockUserRepository();
    this.classUnderTest = new GetUsersUseCase(this.mockRepo);
  }
}

describe('GetUsersUseCase', () => {
  const t = new GetUsersUseCaseTest();
  beforeEach(() => t.setup());

  it('returns list of users from repository', async () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', address: { street: 'Main St', suite: '1A', city: 'Bratislava', zipcode: '81101' } },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', address: { street: 'Oak Ave', suite: '2B', city: 'Praha', zipcode: '10000' } },
    ];

    await test({
      given: () => {
        (t.mockRepo.getUsers as jest.Mock).mockResolvedValue(users);
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toEqual(users);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('John Doe');
      },
    });
  });

  it('returns empty list when no users', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toEqual([]);
      },
    });
  });

  it('throws when repository fails', async () => {
    (t.mockRepo.getUsers as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(t.classUnderTest.execute()).rejects.toThrow('Network error');
  });
});
