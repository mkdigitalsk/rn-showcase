declare module 'react-native-torch' {
  interface TorchModule {
    // Android's native method takes both callbacks and invokes them unguarded; iOS takes the state alone.
    switchState(state: boolean, onSuccess?: () => void, onFailure?: (error: string) => void): void;
  }
  const Torch: TorchModule;
  export default Torch;
}
