import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { SetPersistentCounterUseCase } from '../../../../domain/useCases/storage/SetPersistentCounterUseCase';
import { StorageRepository } from '../../../../domain/repositories/StorageRepository';

function createMockStorageRepository(): StorageRepository {
  return {
    loadInitialData: jest.fn(),
    setSessionCounter: jest.fn(),
    setPersistentCounter: jest.fn().mockResolvedValue(undefined),
    clearSession: jest.fn(),
    observe: jest.fn(),
  };
}

class SetPersistentCounterUseCaseTest extends BaseTest<SetPersistentCounterUseCase> {
  classUnderTest!: SetPersistentCounterUseCase;
  mockRepo!: StorageRepository;

  beforeEach() {
    this.mockRepo = createMockStorageRepository();
    this.classUnderTest = new SetPersistentCounterUseCase(this.mockRepo);
  }
}

describe('SetPersistentCounterUseCase', () => {
  const t = new SetPersistentCounterUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with value 0', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(0),
      then: () => {
        expect(t.mockRepo.setPersistentCounter).toHaveBeenCalledWith(0);
      },
    });
  });

  it('calls repository with value 42', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(42),
      then: () => {
        expect(t.mockRepo.setPersistentCounter).toHaveBeenCalledWith(42);
      },
    });
  });
});
