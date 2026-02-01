import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { TrackButtonClickUseCase } from '../../../../domain/useCases/analytics/TrackButtonClickUseCase';
import { AnalyticsClient } from '../../../../data/analytics/AnalyticsClient';

function createMockAnalyticsClient(): AnalyticsClient {
  return {
    trackScreen: jest.fn(),
    recordException: jest.fn(),
    log: jest.fn(),
  };
}

class TrackButtonClickUseCaseTest extends BaseTest<TrackButtonClickUseCase> {
  classUnderTest!: TrackButtonClickUseCase;
  mockClient!: AnalyticsClient;

  beforeEach() {
    this.mockClient = createMockAnalyticsClient();
    this.classUnderTest = new TrackButtonClickUseCase(this.mockClient);
  }
}

describe('TrackButtonClickUseCase', () => {
  const t = new TrackButtonClickUseCaseTest();
  beforeEach(() => t.setup());

  it('logs button click with button name', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute('Submit'),
      then: () => {
        expect(t.mockClient.log).toHaveBeenCalledWith('Button Clicked: Submit');
      },
    });
  });

  it('logs each button click separately', async () => {
    await t.classUnderTest.execute('Submit');
    await t.classUnderTest.execute('Cancel');

    expect(t.mockClient.log).toHaveBeenCalledTimes(2);
    expect(t.mockClient.log).toHaveBeenNthCalledWith(1, 'Button Clicked: Submit');
    expect(t.mockClient.log).toHaveBeenNthCalledWith(2, 'Button Clicked: Cancel');
  });
});
