import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { GetTodayDateUseCase } from '../../../../domain/useCases/calendar/GetTodayDateUseCase';
import { DateRepository } from '../../../../domain/repositories/DateRepository';

function createMockDateRepository(): DateRepository {
  return {
    today: jest.fn().mockReturnValue('2026-02-01'),
  };
}

class GetTodayDateUseCaseTest extends BaseTest<GetTodayDateUseCase> {
  classUnderTest!: GetTodayDateUseCase;
  mockRepo!: DateRepository;

  beforeEach() {
    this.mockRepo = createMockDateRepository();
    this.classUnderTest = new GetTodayDateUseCase(this.mockRepo);
  }
}

describe('GetTodayDateUseCase', () => {
  const t = new GetTodayDateUseCaseTest();
  beforeEach(() => t.setup());

  it('returns today date from repository', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: (result) => {
        expect(result).toBe('2026-02-01');
        expect(t.mockRepo.today).toHaveBeenCalled();
      },
    });
  });
});
