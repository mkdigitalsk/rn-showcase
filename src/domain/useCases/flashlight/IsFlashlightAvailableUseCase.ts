import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { FlashlightRepository } from '../../repositories/FlashlightRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class IsFlashlightAvailableUseCase extends UseCase<void, boolean> {
  constructor(
    @inject(TYPES.FlashlightRepository) private flashlightRepository: FlashlightRepository,
  ) {
    super();
  }

  protected async run(): Promise<boolean> {
    return this.flashlightRepository.isAvailable();
  }
}
