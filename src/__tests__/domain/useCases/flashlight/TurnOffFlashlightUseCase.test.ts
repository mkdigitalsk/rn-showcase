import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { TurnOffFlashlightUseCase } from '../../../../domain/useCases/flashlight/TurnOffFlashlightUseCase';
import { FlashlightRepository } from '../../../../domain/repositories/FlashlightRepository';

function createMockFlashlightRepository(): FlashlightRepository {
  return {
    isAvailable: jest.fn(),
    toggle: jest.fn(),
    turnOff: jest.fn().mockResolvedValue(false),
  };
}

class TurnOffFlashlightUseCaseTest extends BaseTest<TurnOffFlashlightUseCase> {
  classUnderTest!: TurnOffFlashlightUseCase;
  mockRepo!: FlashlightRepository;

  beforeEach() {
    this.mockRepo = createMockFlashlightRepository();
    this.classUnderTest = new TurnOffFlashlightUseCase(this.mockRepo);
  }
}

describe('TurnOffFlashlightUseCase', () => {
  const t = new TurnOffFlashlightUseCaseTest();
  beforeEach(() => t.setup());

  it('turns off flashlight and returns false', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(false);
        expect(t.mockRepo.turnOff).toHaveBeenCalled();
      },
    });
  });
});
