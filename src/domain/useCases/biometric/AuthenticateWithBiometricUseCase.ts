import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { BiometricRepository, BiometricResult } from '../../repositories/BiometricRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class AuthenticateWithBiometricUseCase extends UseCase<void, BiometricResult> {
  constructor(
    @inject(TYPES.BiometricRepository) private biometricRepository: BiometricRepository,
  ) {
    super();
  }

  protected async run(): Promise<BiometricResult> {
    return this.biometricRepository.authenticate();
  }
}
