import { injectable } from 'tsyringe';
import { httpClient } from './httpClient';
import { handleApiCall } from './apiCallHandler';
import { UserDTO } from '../dto/UserDTO';

export interface UserApi {
  fetchUsers(): Promise<UserDTO[]>;
}

@injectable()
export class UserApiImpl implements UserApi {
  async fetchUsers(): Promise<UserDTO[]> {
    return handleApiCall(async () => {
      const response = await httpClient.get('/users');
      return response.data as UserDTO[];
    });
  }
}
