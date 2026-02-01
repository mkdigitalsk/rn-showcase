import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { StorageData } from '../../models/StorageData';
import { StorageRepository } from '../../repositories/StorageRepository';
import { TYPES } from '../../../app/diTypes';
import { FlowUseCase, Subscription } from '../base/UseCase';

@injectable()
export class ObserveStorageDataUseCase extends FlowUseCase<void, StorageData> {
  constructor(
    @inject(TYPES.StorageRepository) private storageRepository: StorageRepository
  ) {
    super();
  }

  protected doExecute(
    _params: void,
    emit: (value: StorageData) => void,
    _onError: (error: Error) => void
  ): Subscription {
    const unsubscribe = this.storageRepository.observe(emit);
    return { unsubscribe };
  }
}
