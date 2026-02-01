import { BaseTest } from '../../BaseTest';
import { test } from '../../TestFunctions';
import { SettingsRepositoryImpl } from '../../../data/repositories/SettingsRepositoryImpl';
import { PersistentPreferences } from '../../../data/local/PersistentPreferences';

class FakePersistentPreferences implements PersistentPreferences {
  private themeMode = 'system';
  private language: string | undefined = undefined;
  private counter = 0;

  getPersistentCounter(): number { return this.counter; }
  setPersistentCounter(value: number): void { this.counter = value; }
  getThemeMode(): string { return this.themeMode; }
  setThemeMode(mode: string): void { this.themeMode = mode; }
  getLanguage(): string | undefined { return this.language; }
  setLanguage(language: string): void { this.language = language; }
}

class SettingsRepositoryImplTest extends BaseTest<SettingsRepositoryImpl> {
  classUnderTest!: SettingsRepositoryImpl;
  fakePreferences!: FakePersistentPreferences;

  beforeEach() {
    this.fakePreferences = new FakePersistentPreferences();
    this.classUnderTest = new SettingsRepositoryImpl(this.fakePreferences);
  }
}

describe('SettingsRepositoryImpl', () => {
  const t = new SettingsRepositoryImplTest();
  beforeEach(() => t.setup());

  // === Theme Mode ===

  describe('getThemeMode', () => {
    it('returns system as default', () => {
      test({
        whenAction: () => t.classUnderTest.getThemeMode(),
        then: (result) => expect(result).toBe('system'),
      });
    });

    it('returns light when stored', () => {
      test({
        given: () => t.fakePreferences.setThemeMode('light'),
        whenAction: () => t.classUnderTest.getThemeMode(),
        then: (result) => expect(result).toBe('light'),
      });
    });

    it('returns dark when stored', () => {
      test({
        given: () => t.fakePreferences.setThemeMode('dark'),
        whenAction: () => t.classUnderTest.getThemeMode(),
        then: (result) => expect(result).toBe('dark'),
      });
    });

    it('returns system for invalid stored value', () => {
      test({
        given: () => t.fakePreferences.setThemeMode('invalid'),
        whenAction: () => t.classUnderTest.getThemeMode(),
        then: (result) => expect(result).toBe('system'),
      });
    });
  });

  describe('setThemeMode', () => {
    it('persists theme mode', () => {
      test({
        whenAction: () => {
          t.classUnderTest.setThemeMode('dark');
          return t.fakePreferences.getThemeMode();
        },
        then: (result) => expect(result).toBe('dark'),
      });
    });
  });

  // === Language ===

  describe('getLanguage', () => {
    it('returns undefined when no language stored', () => {
      test({
        whenAction: () => t.classUnderTest.getLanguage(),
        then: (result) => expect(result).toBeUndefined(),
      });
    });

    it('returns en when stored', () => {
      test({
        given: () => t.fakePreferences.setLanguage('en'),
        whenAction: () => t.classUnderTest.getLanguage(),
        then: (result) => expect(result).toBe('en'),
      });
    });

    it('returns sk when stored', () => {
      test({
        given: () => t.fakePreferences.setLanguage('sk'),
        whenAction: () => t.classUnderTest.getLanguage(),
        then: (result) => expect(result).toBe('sk'),
      });
    });

    it('returns undefined for invalid language', () => {
      test({
        given: () => t.fakePreferences.setLanguage('fr'),
        whenAction: () => t.classUnderTest.getLanguage(),
        then: (result) => expect(result).toBeUndefined(),
      });
    });
  });

  describe('setLanguage', () => {
    it('persists language', () => {
      test({
        whenAction: () => {
          t.classUnderTest.setLanguage('sk');
          return t.fakePreferences.getLanguage();
        },
        then: (result) => expect(result).toBe('sk'),
      });
    });
  });
});
