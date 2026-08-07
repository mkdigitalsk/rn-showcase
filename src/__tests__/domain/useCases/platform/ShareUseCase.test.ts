import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { ShareUseCase } from '../../../../domain/useCases/platform/ShareUseCase';
import { PlatformRepository } from '../../../../domain/repositories/PlatformRepository';

function createMockPlatformRepository(): PlatformRepository {
  return {
    share: jest.fn().mockResolvedValue(undefined),
    dial: jest.fn(),
    openLink: jest.fn(),
    sendEmail: jest.fn(),
    copyToClipboard: jest.fn(),
  };
}

class ShareUseCaseTest extends BaseTest<ShareUseCase> {
  classUnderTest!: ShareUseCase;
  mockRepo!: PlatformRepository;

  beforeEach() {
    this.mockRepo = createMockPlatformRepository();
    this.classUnderTest = new ShareUseCase(this.mockRepo);
  }
}

describe('ShareUseCase', () => {
  const t = new ShareUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with text, title and url', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute({ text: 'Check this out!', title: 'MK Digital', url: 'https://mkdigital.sk' }),
      then: () => {
        expect(t.mockRepo.share).toHaveBeenCalledWith('Check this out!', 'MK Digital', 'https://mkdigital.sk');
      },
    });
  });
});
