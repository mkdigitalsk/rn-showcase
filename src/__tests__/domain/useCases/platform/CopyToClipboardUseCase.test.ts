import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { CopyToClipboardUseCase } from '../../../../domain/useCases/platform/CopyToClipboardUseCase';
import { PlatformRepository } from '../../../../domain/repositories/PlatformRepository';

function createMockPlatformRepository(): PlatformRepository {
  return {
    share: jest.fn(),
    dial: jest.fn(),
    openLink: jest.fn(),
    sendEmail: jest.fn(),
    copyToClipboard: jest.fn(),
  };
}

class CopyToClipboardUseCaseTest extends BaseTest<CopyToClipboardUseCase> {
  classUnderTest!: CopyToClipboardUseCase;
  mockRepo!: PlatformRepository;

  beforeEach() {
    this.mockRepo = createMockPlatformRepository();
    this.classUnderTest = new CopyToClipboardUseCase(this.mockRepo);
  }
}

describe('CopyToClipboardUseCase', () => {
  const t = new CopyToClipboardUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with text', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute('Hello World'),
      then: () => {
        expect(t.mockRepo.copyToClipboard).toHaveBeenCalledWith('Hello World');
      },
    });
  });
});
