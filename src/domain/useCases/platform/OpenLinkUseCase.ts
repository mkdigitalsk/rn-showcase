import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { PlatformRepository } from '../../repositories/PlatformRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class OpenLinkUseCase extends UseCase<string, void> {
  constructor(
    @inject(TYPES.PlatformRepository) private platformRepository: PlatformRepository,
  ) {
    super();
  }

  protected async run(url: string): Promise<void> {
    return this.platformRepository.openLink(url);
  }
}
