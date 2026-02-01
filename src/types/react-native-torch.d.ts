declare module 'react-native-torch' {
  interface TorchModule {
    switchState(state: boolean): void;
  }
  const Torch: TorchModule;
  export default Torch;
}
