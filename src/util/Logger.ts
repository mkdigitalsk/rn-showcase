const TAG = 'Logger';

export class Logger {

  e(log: string): void;
  e(error: Error): void;
  e(log: string, error: Error): void;
  e(logOrError: string | Error, error?: Error): void {
    if (logOrError instanceof Error) {
      console.error(`${TAG}: ${logOrError.message}`, logOrError);
    } else if (error) {
      console.error(`${TAG}: ${logOrError}`, error);
    } else {
      console.error(`${TAG}: ${logOrError}`);
    }
  }

  d(log: string): void {
    if (__DEV__) {
      console.log(`${TAG}: ${log}`);
    }
  }
}
