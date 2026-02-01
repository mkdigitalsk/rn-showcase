import { injectable } from 'tsyringe';

export interface AnalyticsClient {
  trackScreen(screenName: string): void;
  recordException(error: Error): void;
  log(message: string): void;
}

@injectable()
export class ConsoleAnalyticsClient implements AnalyticsClient {
  trackScreen(screenName: string): void {
    console.log(`[Analytics] Screen: ${screenName}`);
  }

  recordException(error: Error): void {
    console.error(`[Analytics] Exception: ${error.name} - ${error.message}`);
  }

  log(message: string): void {
    console.log(`[Analytics] ${message}`);
  }
}
