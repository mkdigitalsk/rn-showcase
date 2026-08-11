import { injectable } from 'tsyringe';

export interface CrashReporter {
  recordException(error: Error): void;
  log(message: string): void;
}

@injectable()
export class ConsoleCrashReporter implements CrashReporter {
  recordException(error: Error): void {
    console.error(`[CrashReporter] Exception: ${error.name} - ${error.message}`);
  }

  log(message: string): void {
    console.log(`[CrashReporter] ${message}`);
  }
}
