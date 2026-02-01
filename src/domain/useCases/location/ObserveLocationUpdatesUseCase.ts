import { inject, injectable } from 'tsyringe';
import { FlowUseCase, Subscription } from '../base/UseCase';
import { LocationRepository } from '../../repositories/LocationRepository';
import { Location } from '../../model/Location';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class ObserveLocationUpdatesUseCase extends FlowUseCase<void, Location> {
  constructor(
    @inject(TYPES.LocationRepository) private locationRepository: LocationRepository,
  ) {
    super();
  }

  protected doExecute(
    _params: void,
    emit: (value: Location) => void,
    onError: (error: Error) => void,
  ): Subscription | (() => void) {
    return this.locationRepository.startLocationUpdates(emit, onError);
  }
}
