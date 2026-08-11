import { SessionPreferences } from '../../data/local/SessionPreferences';

export class FakeSessionPreferences implements SessionPreferences {
  private sessionCounter = 0;
  private authToken: string | undefined = undefined;

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

  clear(): void {
    this.sessionCounter = 0;
    this.authToken = undefined;
  }
}
