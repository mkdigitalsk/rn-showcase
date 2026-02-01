import { BaseTest } from '../../../BaseTest';
import { ObserveStorageDataUseCase } from '../../../../domain/useCases/storage/ObserveStorageDataUseCase';
import { StorageRepository } from '../../../../domain/repositories/StorageRepository';
import { StorageData } from '../../../../domain/model/StorageData';

function createMockStorageRepository(): StorageRepository {
  return {
    loadInitialData: jest.fn(),
    setSessionCounter: jest.fn(),
    setPersistentCounter: jest.fn(),
    clearSession: jest.fn(),
    observe: jest.fn(),
  };
}

class ObserveStorageDataUseCaseTest extends BaseTest<ObserveStorageDataUseCase> {
  classUnderTest!: ObserveStorageDataUseCase;
  mockRepo!: StorageRepository;

  beforeEach() {
    this.mockRepo = createMockStorageRepository();
    this.classUnderTest = new ObserveStorageDataUseCase(this.mockRepo);
  }
}

describe('ObserveStorageDataUseCase', () => {
  const t = new ObserveStorageDataUseCaseTest();
  beforeEach(() => t.setup());

  it('subscribes to repository observe', () => {
    const mockUnsubscribe = jest.fn();
    (t.mockRepo.observe as jest.Mock).mockReturnValue(mockUnsubscribe);

    const onValue = jest.fn();
    t.classUnderTest.execute().subscribe(onValue);

    expect(t.mockRepo.observe).toHaveBeenCalled();
  });

  it('emits values from repository', () => {
    const data: StorageData = { sessionCounter: 3, persistentCounter: 7 };
    (t.mockRepo.observe as jest.Mock).mockImplementation((listener: (data: StorageData) => void) => {
      listener(data);
      return jest.fn();
    });

    const onValue = jest.fn();
    t.classUnderTest.execute().subscribe(onValue);

    expect(onValue).toHaveBeenCalledWith(data);
  });

  it('returns subscription that can unsubscribe', () => {
    const mockUnsubscribe = jest.fn();
    (t.mockRepo.observe as jest.Mock).mockReturnValue(mockUnsubscribe);

    const onValue = jest.fn();
    const subscription = t.classUnderTest.execute().subscribe(onValue);
    subscription.unsubscribe();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
