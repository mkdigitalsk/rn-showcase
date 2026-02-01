import { User } from '../../../domain/model/User';

export interface NetworkingUiState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

export const initialNetworkingUiState: NetworkingUiState = {
  users: [],
  isLoading: false,
  error: null,
};
