import { BaseTest } from '../../../BaseTest';
import { TrackScreenUseCase } from '../../../../domain/useCases/analytics/TrackScreenUseCase';
import { AnalyticsClient } from '../../../../data/analytics/AnalyticsClient';

function createMockAnalyticsClient(): AnalyticsClient {
  return {
    trackScreen: jest.fn(),
    recordException: jest.fn(),
    log: jest.fn(),
  };
}

class TrackScreenUseCaseTest extends BaseTest<TrackScreenUseCase> {
  classUnderTest!: TrackScreenUseCase;
  mockClient!: AnalyticsClient;

  beforeEach() {
    this.mockClient = createMockAnalyticsClient();
    this.classUnderTest = new TrackScreenUseCase(this.mockClient);
  }
}

describe('TrackScreenUseCase', () => {
  const t = new TrackScreenUseCaseTest();
  beforeEach(() => t.setup());

  it('calls analyticsClient.trackScreen with screen name', () => {
    t.classUnderTest.execute('HomeScreen');

    expect(t.mockClient.trackScreen).toHaveBeenCalledWith('HomeScreen');
  });

  it('calls trackScreen each time execute is called', () => {
    t.classUnderTest.execute('HomeScreen');
    t.classUnderTest.execute('SettingsScreen');

    expect(t.mockClient.trackScreen).toHaveBeenCalledTimes(2);
    expect(t.mockClient.trackScreen).toHaveBeenNthCalledWith(1, 'HomeScreen');
    expect(t.mockClient.trackScreen).toHaveBeenNthCalledWith(2, 'SettingsScreen');
  });
});
