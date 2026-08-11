import { useState, useCallback, useEffect } from 'react';
import { toAppError } from '../../foundation/errors/AppError';
import { TYPES } from '../../../app/diTypes';
import { RemoteNote } from '../../../domain/model/RemoteNote';
import { NoteConflictException } from '../../../domain/exceptions/NoteConflictException';
import { GetRemoteNotesUseCase } from '../../../domain/useCases/GetRemoteNotesUseCase';
import { CreateRemoteNoteUseCase } from '../../../domain/useCases/CreateRemoteNoteUseCase';
import { UpdateRemoteNoteUseCase } from '../../../domain/useCases/UpdateRemoteNoteUseCase';
import { DeleteRemoteNoteUseCase } from '../../../domain/useCases/DeleteRemoteNoteUseCase';
import { useResolve } from '../../hooks/useResolve';
import { execute } from '../../hooks/useExecute';
import { NetworkingUiState, initialNetworkingUiState } from './NetworkingUiState';

export const useNetworkingViewModel = () => {
  const [uiState, setUiState] = useState<NetworkingUiState>(initialNetworkingUiState);

  const getNotes = useResolve<GetRemoteNotesUseCase>(TYPES.GetRemoteNotesUseCase);
  const createNote = useResolve<CreateRemoteNoteUseCase>(TYPES.CreateRemoteNoteUseCase);
  const updateNote = useResolve<UpdateRemoteNoteUseCase>(TYPES.UpdateRemoteNoteUseCase);
  const deleteNote = useResolve<DeleteRemoteNoteUseCase>(TYPES.DeleteRemoteNoteUseCase);

  const loadNotes = useCallback(() => {
    execute({
      action: () => getNotes.execute(),
      onLoading: () => setUiState(prev => ({ ...prev, isLoading: true, error: null })),
      onSuccess: notes => setUiState(prev => ({ ...prev, notes, isLoading: false, error: null })),
      onError: e => setUiState(prev => ({ ...prev, isLoading: false, error: toAppError(e) })),
    });
  }, [getNotes]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const onCreate = useCallback(
    (title: string, content: string) => {
      execute({
        action: () => createNote.execute({ title, content }),
        onLoading: () => setUiState(prev => ({ ...prev, isSaving: true, error: null })),
        onSuccess: () => {
          setUiState(prev => ({ ...prev, isSaving: false }));
          loadNotes();
        },
        onError: e => setUiState(prev => ({ ...prev, isSaving: false, error: toAppError(e) })),
      });
    },
    [createNote, loadNotes]
  );

  const onSave = useCallback(
    (id: number, title: string, content: string, etag: string) => {
      execute({
        action: () => updateNote.execute({ id, title, content, etag }),
        onLoading: () => setUiState(prev => ({ ...prev, isSaving: true, error: null, conflict: null })),
        onSuccess: () => {
          setUiState(prev => ({ ...prev, isSaving: false, editing: null }));
          loadNotes();
        },
        onError: e =>
          setUiState(prev =>
            e instanceof NoteConflictException
              ? { ...prev, isSaving: false, conflict: e.current }
              : { ...prev, isSaving: false, error: toAppError(e) }
          ),
      });
    },
    [updateNote, loadNotes]
  );

  const onDelete = useCallback(
    (id: number) => {
      execute({
        action: () => deleteNote.execute(id),
        onSuccess: () => loadNotes(),
        onError: e => setUiState(prev => ({ ...prev, error: toAppError(e) })),
      });
    },
    [deleteNote, loadNotes]
  );

  const onStartEditing = useCallback((note: RemoteNote) => setUiState(prev => ({ ...prev, editing: note })), []);
  const onCancelEditing = useCallback(() => setUiState(prev => ({ ...prev, editing: null, conflict: null })), []);
  const onDiscardMine = useCallback(() => setUiState(prev => ({ ...prev, conflict: null, editing: null })), []);

  const onKeepMine = useCallback(
    (title: string, content: string) => {
      const conflict = uiState.conflict;
      if (conflict) {
        onSave(conflict.id, title, content, conflict.etag);
      }
    },
    [uiState.conflict, onSave]
  );

  return {
    uiState,
    onRetry: loadNotes,
    onCreate,
    onSave,
    onDelete,
    onStartEditing,
    onCancelEditing,
    onKeepMine,
    onDiscardMine,
  };
};
