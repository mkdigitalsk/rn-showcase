import { injectable } from 'tsyringe';
import { httpClient } from './httpClient';
import { handleApiCall } from './apiCallHandler';
import { SignInRequestDTO } from '../dto/auth/SignInRequestDTO';
import { SignUpRequestDTO } from '../dto/auth/SignUpRequestDTO';
import { AuthResponseDTO } from '../dto/auth/AuthResponseDTO';

export interface AuthApi {
  signIn(email: string, password: string): Promise<AuthResponseDTO>;
  signUp(email: string, password: string): Promise<AuthResponseDTO>;
  me(): Promise<AuthResponseDTO>;
  deleteAccount(): Promise<void>;
}

@injectable()
export class AuthApiImpl implements AuthApi {
  async signIn(email: string, password: string): Promise<AuthResponseDTO> {
    return handleApiCall(async () => {
      const body: SignInRequestDTO = { email, password };
      const response = await httpClient.post('/auth/sign-in', body);
      return response.data as AuthResponseDTO;
    });
  }

  async signUp(email: string, password: string): Promise<AuthResponseDTO> {
    return handleApiCall(async () => {
      const body: SignUpRequestDTO = { email, password };
      const response = await httpClient.post('/auth/sign-up', body);
      return response.data as AuthResponseDTO;
    });
  }

  async me(): Promise<AuthResponseDTO> {
    return handleApiCall(async () => {
      const response = await httpClient.post('/auth/token');
      return response.data as AuthResponseDTO;
    });
  }

  async deleteAccount(): Promise<void> {
    return handleApiCall(async () => {
      await httpClient.delete('/users/me');
    });
  }
}
