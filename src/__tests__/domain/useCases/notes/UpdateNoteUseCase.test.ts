import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { UpdateNoteUseCase } from '../../../../domain/useCases/notes/UpdateNoteUseCase';
import { NoteRepository } from '../../../../domain/repositories/NoteRepository';
import { Note } from '../../../../domain/model/Note';

function createMockNoteRepository(): NoteRepository {
  return {
    subscribe: jest.fn(),
    insert: jest.fn(),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn(),
    deleteAll: jest.fn(),
  };
}

class UpdateNoteUseCaseTest extends BaseTest<UpdateNoteUseCase> {
  classUnderTest!: UpdateNoteUseCase;
  mockRepo!: NoteRepository;

  beforeEach() {
    this.mockRepo = createMockNoteRepository();
    this.classUnderTest = new UpdateNoteUseCase(this.mockRepo);
  }
}

describe('UpdateNoteUseCase', () => {
  const t = new UpdateNoteUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository update with note', async () => {
    const note: Note = {
      id: 1,
      title: 'Updated Title',
      content: 'Updated Content',
      createdAt: 1234567890,
    };

    await test({
      whenAction: () => t.classUnderTest.execute(note),
      then: () => {
        expect(t.mockRepo.update).toHaveBeenCalledWith(note);
      },
    });
  });
});
