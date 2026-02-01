import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { ShowNotificationUseCase } from '../../../../domain/useCases/notifications/ShowNotificationUseCase';
import { LocalNotificationService } from '../../../../domain/repositories/LocalNotificationService';
import { AppNotification, NotificationChannel } from '../../../../domain/model/Notification';

function createMockService(): LocalNotificationService {
  return {
    getPermissionStatus: jest.fn(),
    requestPermission: jest.fn(),
    showNotification: jest.fn().mockResolvedValue(undefined),
    cancelAllNotifications: jest.fn(),
    openSettings: jest.fn(),
  };
}

class ShowNotificationUseCaseTest extends BaseTest<ShowNotificationUseCase> {
  classUnderTest!: ShowNotificationUseCase;
  mockService!: LocalNotificationService;

  beforeEach() {
    this.mockService = createMockService();
    this.classUnderTest = new ShowNotificationUseCase(this.mockService);
  }
}

describe('ShowNotificationUseCase', () => {
  const t = new ShowNotificationUseCaseTest();
  beforeEach(() => t.setup());

  it('calls service with notification', async () => {
    const notification: AppNotification = {
      id: '1',
      title: 'Test',
      message: 'Test message',
      channel: NotificationChannel.GENERAL,
    };

    await test({
      whenAction: () => t.classUnderTest.execute(notification),
      then: () => {
        expect(t.mockService.showNotification).toHaveBeenCalledWith(notification);
      },
    });
  });
});
