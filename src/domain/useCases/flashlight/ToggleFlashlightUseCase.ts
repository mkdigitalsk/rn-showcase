import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { FlashlightRepository } from '../../repositories/FlashlightRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class ToggleFlashlightUseCase extends UseCase<boolean, boolean> {
  constructor(
    @inject(TYPES.FlashlightRepository) private flashlightRepository: FlashlightRepository,
  ) {
    super();
  }

  protected async run(currentState: boolean): Promise<boolean> {
    return this.flashlightRepository.toggle(currentState);
  }
}
