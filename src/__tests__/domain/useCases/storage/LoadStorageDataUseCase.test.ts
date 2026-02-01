import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { LoadStorageDataUseCase } from '../../../../domain/useCases/storage/LoadStorageDataUseCase';
import { StorageRepository } from '../../../../domain/repositories/StorageRepository';
import { StorageData } from '../../../../domain/model/StorageData';

function createMockStorageRepository(): StorageRepository {
  return {
    loadInitialData: jest.fn().mockResolvedValue({ sessionCounter: 0, persistentCounter: 0 }),
    setSessionCounter: jest.fn(),
    setPersistentCounter: jest.fn(),
    clearSession: jest.fn(),
    observe: jest.fn(),
  };
}

class LoadStorageDataUseCaseTest extends BaseTest<LoadStorageDataUseCase> {
  classUnderTest!: LoadStorageDataUseCase;
  mockRepo!: StorageRepository;

  beforeEach() {
    this.mockRepo = createMockStorageRepository();
    this.classUnderTest = new LoadStorageDataUseCase(this.mockRepo);
  }
}

describe('LoadStorageDataUseCase', () => {
  const t = new LoadStorageDataUseCaseTest();
  beforeEach(() => t.setup());

  it('returns initial storage data from repository', async () => {
    const expected: StorageData = { sessionCounter: 0, persistentCounter: 0 };

    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toEqual(expected);
        expect(t.mockRepo.loadInitialData).toHaveBeenCalled();
      },
    });
  });

  it('returns storage data with values', async () => {
    const expected: StorageData = { sessionCounter: 5, persistentCounter: 10 };

    await test({
      given: () => {
        (t.mockRepo.loadInitialData as jest.Mock).mockResolvedValue(expected);
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toEqual(expected);
      },
    });
  });
});
