import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { LocationRepository } from '../../repositories/LocationRepository';
import { Location } from '../../model/Location';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class GetLocationUseCase extends UseCase<void, Location> {
  constructor(
    @inject(TYPES.LocationRepository) private locationRepository: LocationRepository,
  ) {
    super();
  }

  protected async run(): Promise<Location> {
    return this.locationRepository.getLastKnownLocation();
  }
}
