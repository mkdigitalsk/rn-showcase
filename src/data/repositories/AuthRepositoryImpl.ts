import { inject, injectable } from 'tsyringe';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { RegisteredUser } from '../../domain/model/RegisteredUser';
import { ApiException } from '../../domain/exceptions/BaseException';
import { EmailAlreadyExistsException } from '../../domain/exceptions/AuthException';
import { AuthApi } from '../network/AuthApi';
import { SessionPreferences } from '../local/SessionPreferences';
import { toRegisteredUser } from '../dto/auth/AuthResponseMapper';
import { TYPES } from '../../app/diTypes';

const HTTP_CONFLICT = 409;

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @inject(TYPES.AuthApi) private api: AuthApi,
    @inject(TYPES.SessionPreferences) private session: SessionPreferences,
  ) {}

  async login(email: string, password: string): Promise<RegisteredUser> {
    const response = await this.api.login(email, password);
    this.session.setAuthToken(response.token);
    return toRegisteredUser(response);
  }

  async register(name: string, email: string, password: string): Promise<RegisteredUser> {
    try {
      const response = await this.api.register(email, password, name);
      this.session.setAuthToken(response.token);
      return toRegisteredUser(response);
    } catch (error) {
      if (error instanceof ApiException && error.httpCode === HTTP_CONFLICT) {
        throw new EmailAlreadyExistsException();
      }
      throw error;
    }
  }

  // Server is the source of truth — a duplicate email is rejected at register (409).
  async emailExists(_email: string): Promise<boolean> {
    return false;
  }
}
