import { renderHook, act, waitFor } from '@testing-library/react-native';
import { NoteConflictException } from '../../../../domain/exceptions/NoteConflictException';

const milk = {
  id: 1,
  title: 'Buy milk',
  content: 'two litres',
  createdAt: 0,
  updatedAt: 0,
  etag: '"0"',
};

const mockGetNotes = { execute: jest.fn().mockResolvedValue([milk]) };
const mockCreateNote = { execute: jest.fn().mockResolvedValue(milk) };
const mockUpdateNote = { execute: jest.fn().mockResolvedValue(milk) };
const mockDeleteNote = { execute: jest.fn().mockResolvedValue(undefined) };

jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn((token: symbol) => {
      const key = token.toString();
      if (key.includes('GetRemoteNotes')) {
        return mockGetNotes;
      }
      if (key.includes('CreateRemoteNote')) {
        return mockCreateNote;
      }
      if (key.includes('UpdateRemoteNote')) {
        return mockUpdateNote;
      }
      if (key.includes('DeleteRemoteNote')) {
        return mockDeleteNote;
      }
      return {};
    }),
  },
  injectable: () => (target: unknown) => target,
  inject: () => () => {},
}));

import { useNetworkingViewModel } from '../../../../presentation/screens/networking/useNetworkingViewModel';

describe('useNetworkingViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetNotes.execute.mockResolvedValue([milk]);
    mockUpdateNote.execute.mockResolvedValue(milk);
  });

  it('loads the notes the account owns', async () => {
    const { result } = renderHook(() => useNetworkingViewModel());

    await waitFor(() => expect(result.current.uiState.notes).toEqual([milk]));
    expect(result.current.uiState.isLoading).toBe(false);
  });

  it('sends the tag it read when saving an edit', async () => {
    const { result } = renderHook(() => useNetworkingViewModel());
    await waitFor(() => expect(result.current.uiState.notes).toHaveLength(1));

    await act(async () => {
      result.current.onSave(1, 'Buy oat milk', 'one litre', '"0"');
    });

    expect(mockUpdateNote.execute).toHaveBeenCalledWith({
      id: 1,
      title: 'Buy oat milk',
      content: 'one litre',
      etag: '"0"',
    });
  });

  it("surfaces the server's row when the write is refused", async () => {
    const theirs = { ...milk, title: 'Someone else won', etag: '"7"' };
    mockUpdateNote.execute.mockRejectedValueOnce(new NoteConflictException(theirs));

    const { result } = renderHook(() => useNetworkingViewModel());
    await waitFor(() => expect(result.current.uiState.notes).toHaveLength(1));

    await act(async () => {
      result.current.onSave(1, 'Mine', 'mine', '"0"');
    });

    await waitFor(() => expect(result.current.uiState.conflict).toEqual(theirs));
    expect(result.current.uiState.error).toBeNull();
  });

  it('retries against the tag the server returned when the person keeps theirs', async () => {
    const theirs = { ...milk, title: 'Someone else won', etag: '"7"' };
    mockUpdateNote.execute.mockRejectedValueOnce(new NoteConflictException(theirs));

    const { result } = renderHook(() => useNetworkingViewModel());
    await waitFor(() => expect(result.current.uiState.notes).toHaveLength(1));

    await act(async () => {
      result.current.onSave(1, 'Mine', 'mine', '"0"');
    });
    await waitFor(() => expect(result.current.uiState.conflict).not.toBeNull());

    await act(async () => {
      result.current.onKeepMine('Mine', 'mine');
    });

    expect(mockUpdateNote.execute).toHaveBeenLastCalledWith({
      id: 1,
      title: 'Mine',
      content: 'mine',
      etag: '"7"',
    });
  });
});
