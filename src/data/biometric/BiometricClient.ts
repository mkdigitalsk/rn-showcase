import { injectable } from 'tsyringe';
import ReactNativeBiometrics from 'react-native-biometrics';
import { BiometricResult } from '../../domain/repositories/BiometricRepository';

const rnBiometrics = new ReactNativeBiometrics();

@injectable()
export class BiometricClient {
  async isAvailable(): Promise<boolean> {
    const { available } = await rnBiometrics.isSensorAvailable();
    return available;
  }

  async authenticate(): Promise<BiometricResult> {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate',
      });

      if (success) {
        return { type: 'success' };
      }
      return { type: 'cancelled' };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      if (message.includes('cancel') || message.includes('Cancel')) {
        return { type: 'cancelled' };
      }
      return { type: 'failed', message };
    }
  }
}
