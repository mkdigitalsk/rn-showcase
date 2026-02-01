import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { OpenNotificationSettingsUseCase } from '../../../../domain/useCases/notifications/OpenNotificationSettingsUseCase';
import { LocalNotificationService } from '../../../../domain/repositories/LocalNotificationService';

function createMockService(): LocalNotificationService {
  return {
    getPermissionStatus: jest.fn(),
    requestPermission: jest.fn(),
    showNotification: jest.fn(),
    cancelAllNotifications: jest.fn(),
    openSettings: jest.fn().mockResolvedValue(undefined),
  };
}

class OpenNotificationSettingsUseCaseTest extends BaseTest<OpenNotificationSettingsUseCase> {
  classUnderTest!: OpenNotificationSettingsUseCase;
  mockService!: LocalNotificationService;

  beforeEach() {
    this.mockService = createMockService();
    this.classUnderTest = new OpenNotificationSettingsUseCase(this.mockService);
  }
}

describe('OpenNotificationSettingsUseCase', () => {
  const t = new OpenNotificationSettingsUseCaseTest();
  beforeEach(() => t.setup());

  it('calls service openSettings', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: () => {
        expect(t.mockService.openSettings).toHaveBeenCalled();
      },
    });
  });
});
