import { injectable } from 'tsyringe';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';
import { Location } from '../../domain/model/Location';

@injectable()
export class LocationClient {
  async requestPermission(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const status = await Geolocation.requestAuthorization('whenInUse');
      return status === 'granted';
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  async getLastKnown(): Promise<Location> {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      throw new Error('Location permission denied');
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        error => reject(new Error(error.message)),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  }

  startUpdates(
    onLocation: (location: Location) => void,
    onError: (error: Error) => void,
  ): () => void {
    const watchId = Geolocation.watchPosition(
      position => {
        onLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      error => onError(new Error(error.message)),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }
}
