import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { DeleteAllNotesUseCase } from '../../../../domain/useCases/notes/DeleteAllNotesUseCase';
import { NoteRepository } from '../../../../domain/repositories/NoteRepository';

function createMockNoteRepository(): NoteRepository {
  return {
    subscribe: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteAll: jest.fn().mockResolvedValue(undefined),
  };
}

class DeleteAllNotesUseCaseTest extends BaseTest<DeleteAllNotesUseCase> {
  classUnderTest!: DeleteAllNotesUseCase;
  mockRepo!: NoteRepository;

  beforeEach() {
    this.mockRepo = createMockNoteRepository();
    this.classUnderTest = new DeleteAllNotesUseCase(this.mockRepo);
  }
}

describe('DeleteAllNotesUseCase', () => {
  const t = new DeleteAllNotesUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository deleteAll', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(),
      then: () => {
        expect(t.mockRepo.deleteAll).toHaveBeenCalled();
      },
    });
  });
});
