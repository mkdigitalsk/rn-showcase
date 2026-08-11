import { SessionPreferences } from '../../data/local/SessionPreferences';

export class FakeSessionPreferences implements SessionPreferences {
  private sessionCounter = 0;
  private authToken: string | undefined = undefined;
  private demoAccount = false;

  getSessionCounter(): number {
    return this.sessionCounter;
  }

  setSessionCounter(value: number): void {
    this.sessionCounter = value;
  }

  getAuthToken(): string | undefined {
    return this.authToken;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  clearAuthToken(): void {
    this.authToken = undefined;
  }

  getDemoAccount(): boolean {
    return this.demoAccount;
  }

  setDemoAccount(value: boolean): void {
    this.demoAccount = value;
  }

  clear(): void {
    this.sessionCounter = 0;
    this.authToken = undefined;
    this.demoAccount = false;
  }
}
