import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { DialUseCase } from '../../../../domain/useCases/platform/DialUseCase';
import { PlatformRepository } from '../../../../domain/repositories/PlatformRepository';

function createMockPlatformRepository(): PlatformRepository {
  return {
    share: jest.fn(),
    dial: jest.fn().mockResolvedValue(undefined),
    openLink: jest.fn(),
    sendEmail: jest.fn(),
    copyToClipboard: jest.fn(),
  };
}

class DialUseCaseTest extends BaseTest<DialUseCase> {
  classUnderTest!: DialUseCase;
  mockRepo!: PlatformRepository;

  beforeEach() {
    this.mockRepo = createMockPlatformRepository();
    this.classUnderTest = new DialUseCase(this.mockRepo);
  }
}

describe('DialUseCase', () => {
  const t = new DialUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with phone number', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute('+421900123456'),
      then: () => {
        expect(t.mockRepo.dial).toHaveBeenCalledWith('+421900123456');
      },
    });
  });
});
