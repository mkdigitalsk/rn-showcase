import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { OpenLinkUseCase } from '../../../../domain/useCases/platform/OpenLinkUseCase';
import { PlatformRepository } from '../../../../domain/repositories/PlatformRepository';

function createMockPlatformRepository(): PlatformRepository {
  return {
    share: jest.fn(),
    dial: jest.fn(),
    openLink: jest.fn().mockResolvedValue(undefined),
    sendEmail: jest.fn(),
    copyToClipboard: jest.fn(),
  };
}

class OpenLinkUseCaseTest extends BaseTest<OpenLinkUseCase> {
  classUnderTest!: OpenLinkUseCase;
  mockRepo!: PlatformRepository;

  beforeEach() {
    this.mockRepo = createMockPlatformRepository();
    this.classUnderTest = new OpenLinkUseCase(this.mockRepo);
  }
}

describe('OpenLinkUseCase', () => {
  const t = new OpenLinkUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with url', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute('https://example.com'),
      then: () => {
        expect(t.mockRepo.openLink).toHaveBeenCalledWith('https://example.com');
      },
    });
  });
});
