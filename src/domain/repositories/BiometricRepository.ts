export type BiometricResult =
  | { type: 'success' }
  | { type: 'failed'; message: string }
  | { type: 'cancelled' }
  | { type: 'not_available' };

export interface BiometricRepository {
  isAvailable(): Promise<boolean>;
  authenticate(): Promise<BiometricResult>;
}
