import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { SetSessionCounterUseCase } from '../../../../domain/useCases/storage/SetSessionCounterUseCase';
import { StorageRepository } from '../../../../domain/repositories/StorageRepository';

function createMockStorageRepository(): StorageRepository {
  return {
    loadInitialData: jest.fn(),
    setSessionCounter: jest.fn().mockResolvedValue(undefined),
    setPersistentCounter: jest.fn(),
    clearSession: jest.fn(),
    observe: jest.fn(),
  };
}

class SetSessionCounterUseCaseTest extends BaseTest<SetSessionCounterUseCase> {
  classUnderTest!: SetSessionCounterUseCase;
  mockRepo!: StorageRepository;

  beforeEach() {
    this.mockRepo = createMockStorageRepository();
    this.classUnderTest = new SetSessionCounterUseCase(this.mockRepo);
  }
}

describe('SetSessionCounterUseCase', () => {
  const t = new SetSessionCounterUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with value 0', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(0),
      then: () => {
        expect(t.mockRepo.setSessionCounter).toHaveBeenCalledWith(0);
      },
    });
  });

  it('calls repository with value 15', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(15),
      then: () => {
        expect(t.mockRepo.setSessionCounter).toHaveBeenCalledWith(15);
      },
    });
  });
});
