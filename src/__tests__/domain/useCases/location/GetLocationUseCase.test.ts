import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { GetLocationUseCase } from '../../../../domain/useCases/location/GetLocationUseCase';
import { LocationRepository } from '../../../../domain/repositories/LocationRepository';
import { Location } from '../../../../domain/model/Location';

function createMockLocationRepository(): LocationRepository {
  return {
    getLastKnownLocation: jest.fn().mockResolvedValue({ lat: 0, lon: 0 }),
    startLocationUpdates: jest.fn(),
  };
}

class GetLocationUseCaseTest extends BaseTest<GetLocationUseCase> {
  classUnderTest!: GetLocationUseCase;
  mockRepo!: LocationRepository;

  beforeEach() {
    this.mockRepo = createMockLocationRepository();
    this.classUnderTest = new GetLocationUseCase(this.mockRepo);
  }
}

describe('GetLocationUseCase', () => {
  const t = new GetLocationUseCaseTest();
  beforeEach(() => t.setup());

  it('returns location from repository', async () => {
    const expected: Location = { lat: 48.1486, lon: 17.1077 };

    await test({
      given: () => {
        (t.mockRepo.getLastKnownLocation as jest.Mock).mockResolvedValue(expected);
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toEqual(expected);
        expect(t.mockRepo.getLastKnownLocation).toHaveBeenCalled();
      },
    });
  });
});
