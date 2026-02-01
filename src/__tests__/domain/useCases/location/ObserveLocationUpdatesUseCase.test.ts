import { BaseTest } from '../../../BaseTest';
import { ObserveLocationUpdatesUseCase } from '../../../../domain/useCases/location/ObserveLocationUpdatesUseCase';
import { LocationRepository } from '../../../../domain/repositories/LocationRepository';
import { Location } from '../../../../domain/model/Location';

function createMockLocationRepository(): LocationRepository {
  return {
    getLastKnownLocation: jest.fn(),
    startLocationUpdates: jest.fn(),
  };
}

class ObserveLocationUpdatesUseCaseTest extends BaseTest<ObserveLocationUpdatesUseCase> {
  classUnderTest!: ObserveLocationUpdatesUseCase;
  mockRepo!: LocationRepository;

  beforeEach() {
    this.mockRepo = createMockLocationRepository();
    this.classUnderTest = new ObserveLocationUpdatesUseCase(this.mockRepo);
  }
}

describe('ObserveLocationUpdatesUseCase', () => {
  const t = new ObserveLocationUpdatesUseCaseTest();
  beforeEach(() => t.setup());

  it('subscribes to location updates from repository', () => {
    const mockUnsubscribe = jest.fn();
    (t.mockRepo.startLocationUpdates as jest.Mock).mockReturnValue(mockUnsubscribe);

    const onValue = jest.fn();
    t.classUnderTest.execute().subscribe(onValue);

    expect(t.mockRepo.startLocationUpdates).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));
  });

  it('emits location updates', () => {
    const location: Location = { lat: 48.1486, lon: 17.1077 };
    (t.mockRepo.startLocationUpdates as jest.Mock).mockImplementation(
      (onLocation: (loc: Location) => void) => {
        onLocation(location);
        return jest.fn();
      },
    );

    const onValue = jest.fn();
    t.classUnderTest.execute().subscribe(onValue);

    expect(onValue).toHaveBeenCalledWith(location);
  });

  it('returns subscription that can unsubscribe', () => {
    const mockUnsubscribe = jest.fn();
    (t.mockRepo.startLocationUpdates as jest.Mock).mockReturnValue(mockUnsubscribe);

    const subscription = t.classUnderTest.execute().subscribe(jest.fn());
    subscription.unsubscribe();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
