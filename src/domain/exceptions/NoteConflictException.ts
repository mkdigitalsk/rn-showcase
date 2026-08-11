import { BaseException } from './BaseException';
import { RemoteNote } from '../model/RemoteNote';

export class NoteConflictException extends BaseException {
  readonly errorCode = '2412';
  readonly logMessage = 'The note was edited elsewhere while this edit was open';
  readonly shouldReport = false;

  constructor(readonly current: RemoteNote) {
    super('The note changed on the server');
  }
}
