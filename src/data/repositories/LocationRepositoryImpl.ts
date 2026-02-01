import { inject, injectable } from 'tsyringe';
import { LocationRepository } from '../../domain/repositories/LocationRepository';
import { LocationClient } from '../location/LocationClient';
import { Location } from '../../domain/model/Location';
import { TYPES } from '../../app/diTypes';

@injectable()
export class LocationRepositoryImpl implements LocationRepository {
  constructor(
    @inject(TYPES.LocationClient) private client: LocationClient,
  ) {}

  async getLastKnownLocation(): Promise<Location> {
    return this.client.getLastKnown();
  }

  startLocationUpdates(
    onLocation: (location: Location) => void,
    onError: (error: Error) => void,
  ): () => void {
    return this.client.startUpdates(onLocation, onError);
  }
}
