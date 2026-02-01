import { inject, injectable } from 'tsyringe';
import { AnalyticsClient } from '../../../data/analytics/AnalyticsClient';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class TrackScreenUseCase {
  constructor(
    @inject(TYPES.AnalyticsClient) private analyticsClient: AnalyticsClient,
  ) {}

  execute(screenName: string): void {
    this.analyticsClient.trackScreen(screenName);
  }
}
