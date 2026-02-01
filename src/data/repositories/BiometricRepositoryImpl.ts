import { inject, injectable } from 'tsyringe';
import { BiometricRepository, BiometricResult } from '../../domain/repositories/BiometricRepository';
import { BiometricClient } from '../biometric/BiometricClient';
import { TYPES } from '../../app/diTypes';

@injectable()
export class BiometricRepositoryImpl implements BiometricRepository {
  constructor(
    @inject(TYPES.BiometricClient) private client: BiometricClient,
  ) {}

  async isAvailable(): Promise<boolean> {
    return this.client.isAvailable();
  }

  async authenticate(): Promise<BiometricResult> {
    return this.client.authenticate();
  }
}
