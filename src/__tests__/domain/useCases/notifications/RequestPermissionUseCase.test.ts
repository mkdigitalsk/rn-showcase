import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { RequestPermissionUseCase } from '../../../../domain/useCases/notifications/RequestPermissionUseCase';
import { LocalNotificationService } from '../../../../domain/repositories/LocalNotificationService';
import { PushPermissionStatus } from '../../../../domain/model/Notification';

function createMockService(): LocalNotificationService {
  return {
    getPermissionStatus: jest.fn(),
    requestPermission: jest.fn().mockResolvedValue(PushPermissionStatus.GRANTED),
    showNotification: jest.fn(),
    cancelAllNotifications: jest.fn(),
    openSettings: jest.fn(),
  };
}

class RequestPermissionUseCaseTest extends BaseTest<RequestPermissionUseCase> {
  classUnderTest!: RequestPermissionUseCase;
  mockService!: LocalNotificationService;

  beforeEach() {
    this.mockService = createMockService();
    this.classUnderTest = new RequestPermissionUseCase(this.mockService);
  }
}

describe('RequestPermissionUseCase', () => {
  const t = new RequestPermissionUseCaseTest();
  beforeEach(() => t.setup());

  it('returns GRANTED when permission granted', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(PushPermissionStatus.GRANTED);
        expect(t.mockService.requestPermission).toHaveBeenCalled();
      },
    });
  });

  it('returns DENIED when permission denied', async () => {
    await test({
      given: () => {
        (t.mockService.requestPermission as jest.Mock).mockResolvedValue(PushPermissionStatus.DENIED);
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(PushPermissionStatus.DENIED);
      },
    });
  });
});
