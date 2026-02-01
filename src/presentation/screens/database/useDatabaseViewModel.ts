import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { container, TYPES } from '../../../app/di/diContainer';
import { SearchNotesUseCase } from '../../../domain/useCases/notes/SearchNotesUseCase';
import { InsertNoteUseCase } from '../../../domain/useCases/notes/InsertNoteUseCase';
import { DeleteNoteUseCase } from '../../../domain/useCases/notes/DeleteNoteUseCase';
import { DeleteAllNotesUseCase } from '../../../domain/useCases/notes/DeleteAllNotesUseCase';
import { NoteSortOption } from '../../../domain/model/Note';
import { DatabaseUiState, initialDatabaseUiState } from './DatabaseUiState';

const SEARCH_DEBOUNCE_MS = 300;

export const useDatabaseViewModel = () => {
  const [uiState, setUiState] = useState<DatabaseUiState>(initialDatabaseUiState);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);

  const searchNotesUseCase = useMemo(
    () => container.resolve<SearchNotesUseCase>(TYPES.SearchNotesUseCase), []
  );
  const insertNoteUseCase = useMemo(
    () => container.resolve<InsertNoteUseCase>(TYPES.InsertNoteUseCase), []
  );
  const deleteNoteUseCase = useMemo(
    () => container.resolve<DeleteNoteUseCase>(TYPES.DeleteNoteUseCase), []
  );
  const deleteAllNotesUseCase = useMemo(
    () => container.resolve<DeleteAllNotesUseCase>(TYPES.DeleteAllNotesUseCase), []
  );

  const subscribeToNotes = useCallback((query: string, sortOption: NoteSortOption) => {
    subscriptionRef.current?.unsubscribe();

    const { subscribe } = searchNotesUseCase.execute({ query, sortOption });
    subscriptionRef.current = subscribe((notes) => {
      setUiState(prev => ({ ...prev, notes }));
    });
  }, [searchNotesUseCase]);

  // Initial subscription
  useEffect(() => {
    subscribeToNotes(uiState.searchQuery, uiState.sortOption);
    return () => {
      subscriptionRef.current?.unsubscribe();
    };
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchQueryChange = useCallback((query: string) => {
    setUiState(prev => ({ ...prev, searchQuery: query }));

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setUiState(prev => {
        subscribeToNotes(query, prev.sortOption);
        return prev;
      });
    }, SEARCH_DEBOUNCE_MS);
  }, [subscribeToNotes]);

  const onSortOptionChange = useCallback((sortOption: NoteSortOption) => {
    setUiState(prev => ({ ...prev, sortOption, showSortMenu: false }));
    setUiState(prev => {
      subscribeToNotes(prev.searchQuery, sortOption);
      return prev;
    });
  }, [subscribeToNotes]);

  const toggleSortMenu = useCallback(() => {
    setUiState(prev => ({ ...prev, showSortMenu: !prev.showSortMenu }));
  }, []);

  const onNewNoteTitleChange = useCallback((title: string) => {
    setUiState(prev => ({ ...prev, newNoteTitle: title }));
  }, []);

  const onNewNoteContentChange = useCallback((content: string) => {
    setUiState(prev => ({ ...prev, newNoteContent: content }));
  }, []);

  const addNote = useCallback(async () => {
    const { newNoteTitle, newNoteContent } = uiState;
    if (!newNoteTitle.trim() || !newNoteContent.trim()) { return; }

    await insertNoteUseCase.execute({
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      createdAt: Date.now(),
    });

    setUiState(prev => ({ ...prev, newNoteTitle: '', newNoteContent: '' }));
  }, [uiState.newNoteTitle, uiState.newNoteContent, insertNoteUseCase]);

  const deleteNote = useCallback(async (id: number) => {
    await deleteNoteUseCase.execute(id);
  }, [deleteNoteUseCase]);

  const deleteAllNotes = useCallback(async () => {
    await deleteAllNotesUseCase.execute();
  }, [deleteAllNotesUseCase]);

  return {
    uiState,
    onSearchQueryChange,
    onSortOptionChange,
    toggleSortMenu,
    onNewNoteTitleChange,
    onNewNoteContentChange,
    addNote,
    deleteNote,
    deleteAllNotes,
  };
};
