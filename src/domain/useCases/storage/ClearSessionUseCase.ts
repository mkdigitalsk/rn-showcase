import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { StorageRepository } from '../../repositories/StorageRepository';
import { TYPES } from '../../../app/diTypes';
import { UseCase } from '../base/UseCase';

@injectable()
export class ClearSessionUseCase extends UseCase<void, void> {
  constructor(
    @inject(TYPES.StorageRepository) private storageRepository: StorageRepository
  ) {
    super();
  }

  protected async run(): Promise<void> {
    return this.storageRepository.clearSession();
  }
}
