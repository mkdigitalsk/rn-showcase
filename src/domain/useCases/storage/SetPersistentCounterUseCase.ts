import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { StorageRepository } from '../../repositories/StorageRepository';
import { TYPES } from '../../../app/diTypes';
import { UseCase } from '../base/UseCase';

@injectable()
export class SetPersistentCounterUseCase extends UseCase<number, void> {
  constructor(
    @inject(TYPES.StorageRepository) private storageRepository: StorageRepository
  ) {
    super();
  }

  protected async run(value: number): Promise<void> {
    return this.storageRepository.setPersistentCounter(value);
  }
}
