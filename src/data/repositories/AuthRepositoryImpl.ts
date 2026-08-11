import { inject, injectable } from 'tsyringe';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { SignedUpUser } from '../../domain/model/SignedUpUser';
import { ApiException } from '../../domain/exceptions/BaseException';
import { EmailAlreadyExistsException } from '../../domain/exceptions/AuthException';
import { AuthApi } from '../network/AuthApi';
import { SessionPreferences } from '../local/SessionPreferences';
import { LocalUserDataCleaner } from '../local/LocalUserDataCleaner';
import { toSignedUpUser } from '../dto/auth/AuthResponseMapper';
import { TYPES } from '../../app/diTypes';

const HTTP_CONFLICT = 409;

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @inject(TYPES.AuthApi) private api: AuthApi,
    @inject(TYPES.SessionPreferences) private session: SessionPreferences,
    @inject(TYPES.LocalUserDataCleaner) private localUserData: LocalUserDataCleaner
  ) {}

  async signIn(email: string, password: string): Promise<SignedUpUser> {
    const response = await this.api.signIn(email, password);
    this.session.setAuthToken(response.token);
    return toSignedUpUser(response);
  }

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
    await this.localUserData.clear();
  }

  // The bearer has to still be there when the request goes out, so the teardown follows the call. Once
  // the server answers, the account is gone — a store that will not clear cannot turn that into a
  // failure and leave the person on an account that no longer exists.
  async deleteAccount(): Promise<void> {
    await this.api.deleteAccount();
    await this.localUserData.clear().catch(() => undefined);
  }

  async signUp(email: string, password: string): Promise<SignedUpUser> {
    try {
      const response = await this.api.signUp(email, password);
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
