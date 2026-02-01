import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { IsFlashlightAvailableUseCase } from '../../../../domain/useCases/flashlight/IsFlashlightAvailableUseCase';
import { FlashlightRepository } from '../../../../domain/repositories/FlashlightRepository';

function createMockFlashlightRepository(): FlashlightRepository {
  return {
    isAvailable: jest.fn().mockReturnValue(false),
    toggle: jest.fn(),
  };
}

class IsFlashlightAvailableUseCaseTest extends BaseTest<IsFlashlightAvailableUseCase> {
  classUnderTest!: IsFlashlightAvailableUseCase;
  mockRepo!: FlashlightRepository;

  beforeEach() {
    this.mockRepo = createMockFlashlightRepository();
    this.classUnderTest = new IsFlashlightAvailableUseCase(this.mockRepo);
  }
}

describe('IsFlashlightAvailableUseCase', () => {
  const t = new IsFlashlightAvailableUseCaseTest();
  beforeEach(() => t.setup());

  it('returns true when flashlight is available', async () => {
    await test({
      given: () => {
        (t.mockRepo.isAvailable as jest.Mock).mockReturnValue(true);
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(true);
      },
    });
  });

  it('returns false when flashlight is not available', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(false);
      },
    });
  });
});
