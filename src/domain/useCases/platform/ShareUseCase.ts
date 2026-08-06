import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { PlatformRepository } from '../../repositories/PlatformRepository';
import { TYPES } from '../../../app/diTypes';

export interface ShareParams {
  text: string;
  title: string;
}

@injectable()
export class ShareUseCase extends UseCase<ShareParams, void> {
  constructor(@inject(TYPES.PlatformRepository) private platformRepository: PlatformRepository) {
    super();
  }

  protected async run({ text, title }: ShareParams): Promise<void> {
    return this.platformRepository.share(text, title);
  }
}
