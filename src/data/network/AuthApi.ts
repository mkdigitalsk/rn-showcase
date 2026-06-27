import { injectable } from 'tsyringe';
import { httpClient } from './httpClient';
import { handleApiCall } from './apiCallHandler';
import { LoginRequestDTO } from '../dto/auth/LoginRequestDTO';
import { RegisterRequestDTO } from '../dto/auth/RegisterRequestDTO';
import { AuthResponseDTO } from '../dto/auth/AuthResponseDTO';

export interface AuthApi {
  login(email: string, password: string): Promise<AuthResponseDTO>;
  register(email: string, password: string, name: string): Promise<AuthResponseDTO>;
  me(): Promise<AuthResponseDTO>;
}

@injectable()
export class AuthApiImpl implements AuthApi {
  async login(email: string, password: string): Promise<AuthResponseDTO> {
    return handleApiCall(async () => {
      const body: LoginRequestDTO = { email, password };
      const response = await httpClient.post('/auth/login', body);
      return response.data as AuthResponseDTO;
    });
  }

  async register(email: string, password: string, name: string): Promise<AuthResponseDTO> {
    return handleApiCall(async () => {
      const body: RegisterRequestDTO = { email, password, name };
      const response = await httpClient.post('/auth/register', body);
      return response.data as AuthResponseDTO;
    });
  }

  async me(): Promise<AuthResponseDTO> {
    return handleApiCall(async () => {
      const response = await httpClient.get('/auth/me');
      return response.data as AuthResponseDTO;
    });
  }
}
