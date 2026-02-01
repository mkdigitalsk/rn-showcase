import { BaseTest } from '../../../BaseTest';
import { test } from '../../../TestFunctions';
import { InsertNoteUseCase } from '../../../../domain/useCases/notes/InsertNoteUseCase';
import { NoteRepository } from '../../../../domain/repositories/NoteRepository';
import { Note } from '../../../../domain/model/Note';

function createMockNoteRepository(): NoteRepository {
  return {
    subscribe: jest.fn(),
    insert: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn(),
    deleteAll: jest.fn(),
  };
}

class InsertNoteUseCaseTest extends BaseTest<InsertNoteUseCase> {
  classUnderTest!: InsertNoteUseCase;
  mockRepo!: NoteRepository;

  beforeEach() {
    this.mockRepo = createMockNoteRepository();
    this.classUnderTest = new InsertNoteUseCase(this.mockRepo);
  }
}

describe('InsertNoteUseCase', () => {
  const t = new InsertNoteUseCaseTest();
  beforeEach(() => t.setup());

  it('calls repository with note data', async () => {
    const note: Omit<Note, 'id'> = {
      title: 'Test Note',
      content: 'Test Content',
      createdAt: 1234567890,
    };

    await test({
      whenAction: () => t.classUnderTest.execute(note),
      then: () => {
        expect(t.mockRepo.insert).toHaveBeenCalledWith(note);
      },
    });
  });
});
