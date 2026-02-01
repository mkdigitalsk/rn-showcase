import { BaseTest } from '../../../BaseTest';
import { SearchNotesUseCase, SearchNotesParams } from '../../../../domain/useCases/notes/SearchNotesUseCase';
import { NoteRepository } from '../../../../domain/repositories/NoteRepository';
import { Note, NoteSortOption } from '../../../../domain/model/Note';

function createMockNoteRepository(): NoteRepository {
  return {
    subscribe: jest.fn(),
    insert: jest.fn(),
    delete: jest.fn(),
    deleteAll: jest.fn(),
  };
}

class SearchNotesUseCaseTest extends BaseTest<SearchNotesUseCase> {
  classUnderTest!: SearchNotesUseCase;
  mockRepo!: NoteRepository;

  beforeEach() {
    this.mockRepo = createMockNoteRepository();
    this.classUnderTest = new SearchNotesUseCase(this.mockRepo);
  }
}

describe('SearchNotesUseCase', () => {
  const t = new SearchNotesUseCaseTest();
  beforeEach(() => t.setup());

  it('subscribes to repository with query and sort option', () => {
    const mockUnsubscribe = jest.fn();
    (t.mockRepo.subscribe as jest.Mock).mockReturnValue(mockUnsubscribe);

    const params: SearchNotesParams = { query: 'test', sortOption: NoteSortOption.DATE_DESC };
    const onValue = jest.fn();
    t.classUnderTest.execute(params).subscribe(onValue);

    expect(t.mockRepo.subscribe).toHaveBeenCalledWith('test', NoteSortOption.DATE_DESC, expect.any(Function));
  });

  it('emits notes from repository', () => {
    const notes: Note[] = [
      { id: 1, title: 'Note 1', content: 'Content 1', createdAt: 1000 },
      { id: 2, title: 'Note 2', content: 'Content 2', createdAt: 2000 },
    ];
    (t.mockRepo.subscribe as jest.Mock).mockImplementation(
      (_query: string, _sort: NoteSortOption, listener: (notes: Note[]) => void) => {
        listener(notes);
        return jest.fn();
      },
    );

    const onValue = jest.fn();
    const params: SearchNotesParams = { query: '', sortOption: NoteSortOption.TITLE_ASC };
    t.classUnderTest.execute(params).subscribe(onValue);

    expect(onValue).toHaveBeenCalledWith(notes);
  });

  it('returns subscription that can unsubscribe', () => {
    const mockUnsubscribe = jest.fn();
    (t.mockRepo.subscribe as jest.Mock).mockReturnValue(mockUnsubscribe);

    const params: SearchNotesParams = { query: '', sortOption: NoteSortOption.DATE_ASC };
    const subscription = t.classUnderTest.execute(params).subscribe(jest.fn());
    subscription.unsubscribe();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
