import { injectable } from 'tsyringe';
import Torch from 'react-native-torch';
import { Platform } from 'react-native';

// Android's native switchState invokes both callbacks without a null check, so omitting them throws
// inside the module; iOS exports the one-argument form and ignores anything further.
function switchTorch(state: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'ios') {
      Torch.switchState(state);
      resolve();
      return;
    }
    Torch.switchState(
      state,
      () => resolve(),
      error => reject(new Error(error))
    );
  });
}

@injectable()
export class FlashlightClient {
  isAvailable(): boolean {
    // Torch is available on physical devices with camera flash
    // We return true and handle errors at toggle time
    return Platform.OS !== 'web';
  }

  async toggle(currentState: boolean): Promise<boolean> {
    const newState = !currentState;
    await switchTorch(newState);
    return newState;
  }

  async turnOff(): Promise<boolean> {
    await switchTorch(false);
    return false;
  }
}
