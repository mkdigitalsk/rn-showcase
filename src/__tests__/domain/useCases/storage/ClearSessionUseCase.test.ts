import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { ClearSessionUseCase } from '../../../../domain/useCases/storage/ClearSessionUseCase';
import { StorageRepository } from '../../../../domain/repositories/StorageRepository';

function createMockStorageRepository(): StorageRepository {
  return {
    loadInitialData: jest.fn(),
    setSessionCounter: jest.fn(),
    setPersistentCounter: jest.fn(),
    clearSession: jest.fn().mockResolvedValue(undefined),
    observe: jest.fn(),
  };
}

class ClearSessionUseCaseTest extends BaseTest<ClearSessionUseCase> {
  classUnderTest!: ClearSessionUseCase;
  mockRepo!: StorageRepository;

  beforeEach() {
    this.mockRepo = createMockStorageRepository();
    this.classUnderTest = new ClearSessionUseCase(this.mockRepo);
  }
}

describe('ClearSessionUseCase', () => {
  const t = new ClearSessionUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository clearSession', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: () => {
        expect(t.mockRepo.clearSession).toHaveBeenCalled();
      },
    });
  });
});
