import { inject, injectable } from 'tsyringe';
import { FlashlightRepository } from '../../domain/repositories/FlashlightRepository';
import { FlashlightClient } from '../flashlight/FlashlightClient';
import { TYPES } from '../../app/diTypes';

@injectable()
export class FlashlightRepositoryImpl implements FlashlightRepository {
  constructor(
    @inject(TYPES.FlashlightClient) private client: FlashlightClient,
  ) {}

  isAvailable(): boolean {
    return this.client.isAvailable();
  }

  async toggle(currentState: boolean): Promise<boolean> {
    return this.client.toggle(currentState);
  }
}
