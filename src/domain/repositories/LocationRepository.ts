import { Location } from '../model/Location';

export interface LocationRepository {
  getLastKnownLocation(): Promise<Location>;
  startLocationUpdates(
    onLocation: (location: Location) => void,
    onError: (error: Error) => void,
  ): () => void;
}
