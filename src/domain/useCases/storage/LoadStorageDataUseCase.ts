import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { StorageData } from '../../model/StorageData';
import { StorageRepository } from '../../repositories/StorageRepository';
import { TYPES } from '../../../app/diTypes';
import { UseCase } from '../base/UseCase';

@injectable()
export class LoadStorageDataUseCase extends UseCase<void, StorageData> {
  constructor(
    @inject(TYPES.StorageRepository) private storageRepository: StorageRepository
  ) {
    super();
  }

  protected async run(): Promise<StorageData> {
    return this.storageRepository.loadInitialData();
  }
}
