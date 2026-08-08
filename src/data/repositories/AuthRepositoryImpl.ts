import { inject, injectable } from 'tsyringe';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { SignedUpUser } from '../../domain/model/SignedUpUser';
import { ApiException } from '../../domain/exceptions/BaseException';
import { EmailAlreadyExistsException } from '../../domain/exceptions/AuthException';
import { AuthApi } from '../network/AuthApi';
import { SessionPreferences } from '../local/SessionPreferences';
import { toSignedUpUser } from '../dto/auth/AuthResponseMapper';
import { TYPES } from '../../app/diTypes';

const HTTP_CONFLICT = 409;

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(@inject(TYPES.AuthApi) private api: AuthApi, @inject(TYPES.SessionPreferences) private session: SessionPreferences) {}

  async signIn(email: string, password: string): Promise<SignedUpUser> {
    const response = await this.api.signIn(email, password);
    this.session.setAuthToken(response.token);
    return toSignedUpUser(response);
  }

  // The stored token is the whole session; the server decides whether it still holds.
  async signInWithToken(): Promise<SignedUpUser | null> {
    if (!this.session.getAuthToken()) {
      return null;
    }
    try {
      const response = await this.api.me();
      this.session.setAuthToken(response.token);
      return toSignedUpUser(response);
    } catch {
      return null;
    }
  }

  async signOut(): Promise<void> {
    this.session.clearAuthToken();
  }

  async signUp(name: string, email: string, password: string): Promise<SignedUpUser> {
    try {
      const response = await this.api.signUp(email, password, name);
      this.session.setAuthToken(response.token);
      return toSignedUpUser(response);
    } catch (error) {
      if (error instanceof ApiException && error.httpCode === HTTP_CONFLICT) {
        throw new EmailAlreadyExistsException();
      }
      throw error;
    }
  }

  // Server is the source of truth — a duplicate email is rejected at signUp (409).
  async emailExists(_email: string): Promise<boolean> {
    return false;
  }
}
