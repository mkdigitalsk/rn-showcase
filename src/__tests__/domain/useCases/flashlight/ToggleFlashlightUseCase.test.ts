import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { ToggleFlashlightUseCase } from '../../../../domain/useCases/flashlight/ToggleFlashlightUseCase';
import { FlashlightRepository } from '../../../../domain/repositories/FlashlightRepository';

function createMockFlashlightRepository(): FlashlightRepository {
  return {
    isAvailable: jest.fn(),
    toggle: jest.fn().mockResolvedValue(true),
  };
}

class ToggleFlashlightUseCaseTest extends BaseTest<ToggleFlashlightUseCase> {
  classUnderTest!: ToggleFlashlightUseCase;
  mockRepo!: FlashlightRepository;

  beforeEach() {
    this.mockRepo = createMockFlashlightRepository();
    this.classUnderTest = new ToggleFlashlightUseCase(this.mockRepo);
  }
}

describe('ToggleFlashlightUseCase', () => {
  const t = new ToggleFlashlightUseCaseTest();
  beforeEach(() => t.setup());

  it('toggles flashlight on and returns true', async () => {
    await test({
      given: () => {
        (t.mockRepo.toggle as jest.Mock).mockResolvedValue(true);
      },
      whenAction: () => t.classUnderTest.execute(false),
      then: (result) => {
        expect(result).toBe(true);
        expect(t.mockRepo.toggle).toHaveBeenCalledWith(false);
      },
    });
  });

  it('toggles flashlight off and returns false', async () => {
    await test({
      given: () => {
        (t.mockRepo.toggle as jest.Mock).mockResolvedValue(false);
      },
      whenAction: () => t.classUnderTest.execute(true),
      then: (result) => {
        expect(result).toBe(false);
        expect(t.mockRepo.toggle).toHaveBeenCalledWith(true);
      },
    });
  });
});
