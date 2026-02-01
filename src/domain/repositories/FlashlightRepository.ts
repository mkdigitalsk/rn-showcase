export interface FlashlightRepository {
  isAvailable(): boolean;
  toggle(currentState: boolean): Promise<boolean>;
  turnOff(): Promise<boolean>;
}
