import { injectable } from 'tsyringe';
import Torch from 'react-native-torch';
import { Platform } from 'react-native';

@injectable()
export class FlashlightClient {
  isAvailable(): boolean {
    // Torch is available on physical devices with camera flash
    // We return true and handle errors at toggle time
    return Platform.OS !== 'web';
  }

  async toggle(currentState: boolean): Promise<boolean> {
    const newState = !currentState;
    if (Platform.OS === 'ios') {
      Torch.switchState(newState);
    } else {
      await Torch.switchState(newState);
    }
    return newState;
  }

  async turnOff(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      Torch.switchState(false);
    } else {
      await Torch.switchState(false);
    }
    return false;
  }
}
