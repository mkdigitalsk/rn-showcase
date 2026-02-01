import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { PlatformRepository } from '../../repositories/PlatformRepository';
import { TYPES } from '../../../app/diTypes';

export interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
}

@injectable()
export class SendEmailUseCase extends UseCase<SendEmailParams, void> {
  constructor(
    @inject(TYPES.PlatformRepository) private platformRepository: PlatformRepository,
  ) {
    super();
  }

  protected async run(params: SendEmailParams): Promise<void> {
    return this.platformRepository.sendEmail(params.to, params.subject, params.body);
  }
}
