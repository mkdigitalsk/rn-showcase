import { getCrashlytics, log as crashlyticsLog, recordError } from '@react-native-firebase/crashlytics';
import { injectable } from 'tsyringe';
import { CrashReporter } from './CrashReporter';

@injectable()
export class FirebaseCrashReporter implements CrashReporter {
  private readonly crashlytics = getCrashlytics();

  recordException(error: Error): void {
    recordError(this.crashlytics, error);
  }

  log(message: string): void {
    crashlyticsLog(this.crashlytics, message);
  }
}
