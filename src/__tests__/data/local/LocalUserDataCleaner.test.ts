import { BaseTest } from '../../BaseTest';
import { test } from '../../TestFunctions';
import { LocalUserDataCleanerImpl } from '../../../data/local/LocalUserDataCleaner';
import { FakeSessionPreferences } from '../../fake/FakeSessionPreferences';
import { PersistentPreferencesImpl } from '../../../data/local/PersistentPreferences';
import { FakeNoteRepository } from '../../fake/FakeNoteRepository';

class LocalUserDataCleanerImplTest extends BaseTest<LocalUserDataCleanerImpl> {
  classUnderTest!: LocalUserDataCleanerImpl;
  session!: FakeSessionPreferences;
  persistent!: PersistentPreferencesImpl;
  notes!: FakeNoteRepository;

  beforeEach() {
    this.session = new FakeSessionPreferences();
    this.persistent = new PersistentPreferencesImpl();
    this.notes = new FakeNoteRepository();
    this.classUnderTest = new LocalUserDataCleanerImpl(this.session, this.persistent, this.notes);
  }

  signInAndUseTheApp() {
    this.session.setAuthToken('token-of-the-person-signed-in');
    this.session.setSessionCounter(3);
    this.persistent.setPersistentCounter(7);
    this.persistent.setThemeMode('dark');
    this.persistent.setLanguage('sk');
    void this.notes.insert({ title: 'Buy milk', content: 'two litres', createdAt: 0 });
  }
}

describe('LocalUserDataCleanerImpl', () => {
  const t = new LocalUserDataCleanerImplTest();
  beforeEach(() => t.setup());

  it('leaves nothing of the signed-in person on the device', async () => {
    await test({
      given: () => t.signInAndUseTheApp(),
      whenAction: () => t.classUnderTest.clear(),
      then: () => {
        expect(t.session.getAuthToken()).toBeUndefined();
        expect(t.session.getSessionCounter()).toBe(0);
        expect(t.persistent.getPersistentCounter()).toBe(0);
        expect(t.notes.storedNotes()).toEqual([]);
      },
    });
  });

  it('keeps the theme mode, which belongs to the device', async () => {
    await test({
      given: () => t.signInAndUseTheApp(),
      whenAction: () => t.classUnderTest.clear(),
      then: () => {
        expect(t.persistent.getThemeMode()).toBe('dark');
        expect(t.persistent.getLanguage()).toBe('sk');
      },
    });
  });
});
