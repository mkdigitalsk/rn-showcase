import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { SendEmailUseCase, SendEmailParams } from '../../../../domain/useCases/platform/SendEmailUseCase';
import { PlatformRepository } from '../../../../domain/repositories/PlatformRepository';

function createMockPlatformRepository(): PlatformRepository {
  return {
    share: jest.fn(),
    dial: jest.fn(),
    openLink: jest.fn(),
    sendEmail: jest.fn().mockResolvedValue(undefined),
    copyToClipboard: jest.fn(),
  };
}

class SendEmailUseCaseTest extends BaseTest<SendEmailUseCase> {
  classUnderTest!: SendEmailUseCase;
  mockRepo!: PlatformRepository;

  beforeEach() {
    this.mockRepo = createMockPlatformRepository();
    this.classUnderTest = new SendEmailUseCase(this.mockRepo);
  }
}

describe('SendEmailUseCase', () => {
  const t = new SendEmailUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with email params', async () => {
    const params: SendEmailParams = {
      to: 'test@example.com',
      subject: 'Test Subject',
      body: 'Test Body',
    };

    await test({
      whenAction: () => t.classUnderTest.execute(params),
      then: () => {
        expect(t.mockRepo.sendEmail).toHaveBeenCalledWith(
          'test@example.com',
          'Test Subject',
          'Test Body',
        );
      },
    });
  });
});
