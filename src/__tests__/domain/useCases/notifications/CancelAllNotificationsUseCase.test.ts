import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { CancelAllNotificationsUseCase } from '../../../../domain/useCases/notifications/CancelAllNotificationsUseCase';
import { LocalNotificationService } from '../../../../domain/repositories/LocalNotificationService';

function createMockService(): LocalNotificationService {
  return {
    getPermissionStatus: jest.fn(),
    requestPermission: jest.fn(),
    showNotification: jest.fn(),
    cancelAllNotifications: jest.fn().mockResolvedValue(undefined),
    openSettings: jest.fn(),
  };
}

class CancelAllNotificationsUseCaseTest extends BaseTest<CancelAllNotificationsUseCase> {
  classUnderTest!: CancelAllNotificationsUseCase;
  mockService!: LocalNotificationService;

  beforeEach() {
    this.mockService = createMockService();
    this.classUnderTest = new CancelAllNotificationsUseCase(this.mockService);
  }
}

describe('CancelAllNotificationsUseCase', () => {
  const t = new CancelAllNotificationsUseCaseTest();
  beforeEach(() => t.setup());

  it('calls service cancelAllNotifications', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: () => {
        expect(t.mockService.cancelAllNotifications).toHaveBeenCalled();
      },
    });
  });
});
