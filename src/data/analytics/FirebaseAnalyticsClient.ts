import { getCrashlytics, log as crashlyticsLog, recordError } from '@react-native-firebase/crashlytics';
import { getAnalytics, logScreenView } from '@react-native-firebase/analytics';
import { injectable } from 'tsyringe';
import { AnalyticsClient } from './AnalyticsClient';

@injectable()
export class FirebaseAnalyticsClient implements AnalyticsClient {
  private readonly crashlytics = getCrashlytics();
  private readonly analytics = getAnalytics();

  trackScreen(screenName: string): void {
    logScreenView(this.analytics, { screen_name: screenName, screen_class: screenName });
    crashlyticsLog(this.crashlytics, `Screen: ${screenName}`);
  }

  recordException(error: Error): void {
    recordError(this.crashlytics, error);
  }

  log(message: string): void {
    crashlyticsLog(this.crashlytics, message);
  }
}
