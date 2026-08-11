import { BaseTest } from '../../BaseTest';
import { test } from '../../TestFunctions';
import { AuthRepositoryImpl } from '../../../data/repositories/AuthRepositoryImpl';
import { LocalUserDataCleanerImpl } from '../../../data/local/LocalUserDataCleaner';
import { AuthApi } from '../../../data/network/AuthApi';
import { AuthResponseDTO } from '../../../data/dto/auth/AuthResponseDTO';
import { ApiException } from '../../../domain/exceptions/BaseException';
import { FakeSessionPreferences } from '../../fake/FakeSessionPreferences';
import { FakePersistentPreferences } from '../../fake/FakePersistentPreferences';
import { FakeNoteRepository } from '../../fake/FakeNoteRepository';

jest.mock('../../../data/network/httpClient', () => ({ httpClient: {} }));

const SERVER_ERROR = 500;

class FakeAuthApi implements AuthApi {
  tokenSeenByDeleteAccount: string | undefined = undefined;
  deleteAccountFails = false;
  demo = false;

  constructor(private session: FakeSessionPreferences) {}

  async signIn(): Promise<AuthResponseDTO> {
    return {
      token: 'token-of-the-person-signed-in',
      user: { id: 1, email: 'someone@mkdigital.sk', themeMode: 'system', locale: 'en', demo: this.demo },
    };
  }

  async signUp(): Promise<AuthResponseDTO> {
    throw new Error('not part of these tests');
  }

  async me(): Promise<AuthResponseDTO> {
    throw new Error('not part of these tests');
  }

  async deleteAccount(): Promise<void> {
    this.tokenSeenByDeleteAccount = this.session.getAuthToken();
    if (this.deleteAccountFails) {
      throw new ApiException(SERVER_ERROR, 'Request failed', 'error_server');
    }
  }
}

class AuthRepositoryImplTest extends BaseTest<AuthRepositoryImpl> {
  classUnderTest!: AuthRepositoryImpl;
  api!: FakeAuthApi;
  session!: FakeSessionPreferences;
  persistent!: FakePersistentPreferences;
  notes!: FakeNoteRepository;

  beforeEach() {
    this.session = new FakeSessionPreferences();
    this.persistent = new FakePersistentPreferences();
    this.notes = new FakeNoteRepository();
    this.api = new FakeAuthApi(this.session);
    this.classUnderTest = new AuthRepositoryImpl(
      this.api,
      this.session,
      new LocalUserDataCleanerImpl(this.session, this.persistent, this.notes)
    );
  }

  signInAndUseTheApp() {
    this.session.setAuthToken('token-of-the-person-signed-in');
    this.session.setSessionCounter(3);
    this.persistent.setPersistentCounter(7);
    void this.notes.insert({ title: 'Buy milk', content: 'two litres', createdAt: 0 });
  }
}

describe('AuthRepositoryImpl', () => {
  const t = new AuthRepositoryImplTest();
  beforeEach(() => t.setup());

  describe('signOut', () => {
    it('leaves no note behind for whoever signs in next', async () => {
      await test({
        given: () => t.signInAndUseTheApp(),
        whenAction: () => t.classUnderTest.signOut(),
        then: () => {
          expect(t.session.getAuthToken()).toBeUndefined();
          expect(t.session.getSessionCounter()).toBe(0);
          expect(t.persistent.getPersistentCounter()).toBe(0);
          expect(t.notes.storedNotes()).toEqual([]);
        },
      });
    });
  });

  describe('isDemoAccount', () => {
    it('answers with the flag the server sent at sign in', async () => {
      await test({
        given: () => {
          t.api.demo = true;
        },
        whenAction: async () => {
          await t.classUnderTest.signIn('someone@mkdigital.sk', 'MKDigitalTest1@');
          return t.classUnderTest.isDemoAccount();
        },
        then: isDemo => expect(isDemo).toBe(true),
      });
    });

    it('answers false for an account the server did not flag', async () => {
      await test({
        whenAction: async () => {
          await t.classUnderTest.signIn('someone@mkdigital.sk', 'MKDigitalTest1@');
          return t.classUnderTest.isDemoAccount();
        },
        then: isDemo => expect(isDemo).toBe(false),
      });
    });
  });

  describe('deleteAccount', () => {
    it('calls the endpoint while the bearer is still there, then clears the device', async () => {
      await test({
        given: () => t.signInAndUseTheApp(),
        whenAction: () => t.classUnderTest.deleteAccount(),
        then: () => {
          expect(t.api.tokenSeenByDeleteAccount).toBe('token-of-the-person-signed-in');
          expect(t.session.getAuthToken()).toBeUndefined();
          expect(t.persistent.getPersistentCounter()).toBe(0);
          expect(t.notes.storedNotes()).toEqual([]);
        },
      });
    });

    it('keeps the local data when the server refuses', async () => {
      t.signInAndUseTheApp();
      t.api.deleteAccountFails = true;

      await expect(t.classUnderTest.deleteAccount()).rejects.toBeInstanceOf(ApiException);

      expect(t.session.getAuthToken()).toBe('token-of-the-person-signed-in');
      expect(t.persistent.getPersistentCounter()).toBe(7);
      expect(t.notes.storedNotes()).toHaveLength(1);
    });
  });
});
