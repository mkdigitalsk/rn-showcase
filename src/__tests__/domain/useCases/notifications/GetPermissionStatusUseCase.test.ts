import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { GetPermissionStatusUseCase } from '../../../../domain/useCases/notifications/GetPermissionStatusUseCase';
import { LocalNotificationService } from '../../../../domain/repositories/LocalNotificationService';
import { PushPermissionStatus } from '../../../../domain/model/Notification';

function createMockService(): LocalNotificationService {
  return {
    getPermissionStatus: jest.fn().mockResolvedValue(PushPermissionStatus.NOT_DETERMINED),
    requestPermission: jest.fn(),
    showNotification: jest.fn(),
    cancelAllNotifications: jest.fn(),
    openSettings: jest.fn(),
  };
}

class GetPermissionStatusUseCaseTest extends BaseTest<GetPermissionStatusUseCase> {
  classUnderTest!: GetPermissionStatusUseCase;
  mockService!: LocalNotificationService;

  beforeEach() {
    this.mockService = createMockService();
    this.classUnderTest = new GetPermissionStatusUseCase(this.mockService);
  }
}

describe('GetPermissionStatusUseCase', () => {
  const t = new GetPermissionStatusUseCaseTest();
  beforeEach(() => t.setup());

  it('returns GRANTED status', async () => {
    await test({
      given: () => {
        (t.mockService.getPermissionStatus as jest.Mock).mockResolvedValue(PushPermissionStatus.GRANTED);
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(PushPermissionStatus.GRANTED);
      },
    });
  });

  it('returns DENIED status', async () => {
    await test({
      given: () => {
        (t.mockService.getPermissionStatus as jest.Mock).mockResolvedValue(PushPermissionStatus.DENIED);
      },
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(PushPermissionStatus.DENIED);
      },
    });
  });

  it('returns NOT_DETERMINED status', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe(PushPermissionStatus.NOT_DETERMINED);
      },
    });
  });
});
