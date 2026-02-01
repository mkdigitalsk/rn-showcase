import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { BiometricRepository } from '../../repositories/BiometricRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class IsBiometricEnabledUseCase extends UseCase<void, boolean> {
  constructor(
    @inject(TYPES.BiometricRepository) private biometricRepository: BiometricRepository,
  ) {
    super();
  }

  protected async run(): Promise<boolean> {
    return this.biometricRepository.isAvailable();
  }
}
