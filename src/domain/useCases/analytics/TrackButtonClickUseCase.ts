import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AnalyticsClient } from '../../../data/analytics/AnalyticsClient';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class TrackButtonClickUseCase extends UseCase<string, void> {
  constructor(
    @inject(TYPES.AnalyticsClient) private analyticsClient: AnalyticsClient,
  ) {
    super();
  }

  protected async run(buttonName: string): Promise<void> {
    this.analyticsClient.log(`Button Clicked: ${buttonName}`);
  }
}
