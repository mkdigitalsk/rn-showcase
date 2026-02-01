import { Note, NoteSortOption } from '../../../domain/model/Note';

export interface DatabaseUiState {
  notes: Note[];
  searchQuery: string;
  sortOption: NoteSortOption;
  newNoteTitle: string;
  newNoteContent: string;
  showSortMenu: boolean;
}

export const initialDatabaseUiState: DatabaseUiState = {
  notes: [],
  searchQuery: '',
  sortOption: NoteSortOption.DATE_DESC,
  newNoteTitle: '',
  newNoteContent: '',
  showSortMenu: false,
};
