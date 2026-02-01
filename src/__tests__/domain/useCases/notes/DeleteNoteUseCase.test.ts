import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { DeleteNoteUseCase } from '../../../../domain/useCases/notes/DeleteNoteUseCase';
import { NoteRepository } from '../../../../domain/repositories/NoteRepository';

function createMockNoteRepository(): NoteRepository {
  return {
    subscribe: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn().mockResolvedValue(undefined),
    deleteAll: jest.fn(),
  };
}

class DeleteNoteUseCaseTest extends BaseTest<DeleteNoteUseCase> {
  classUnderTest!: DeleteNoteUseCase;
  mockRepo!: NoteRepository;

  beforeEach() {
    this.mockRepo = createMockNoteRepository();
    this.classUnderTest = new DeleteNoteUseCase(this.mockRepo);
  }
}

describe('DeleteNoteUseCase', () => {
  const t = new DeleteNoteUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository delete with id', async () => {
    await test({
      whenAction: () => t.classUnderTest.execute(42),
      then: () => {
        expect(t.mockRepo.delete).toHaveBeenCalledWith(42);
      },
    });
  });
});
