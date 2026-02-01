export interface StorageUiState {
  sessionCounter: number;
  persistentCounter: number;
}

export const initialStorageUiState: StorageUiState = {
  sessionCounter: 0,
  persistentCounter: 0,
};
