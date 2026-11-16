// Google ML Kit ships no arm64 slice for the iOS Simulator, so the ML Kit scanner links on Android alone; iOS scans
// with VisionCamera's own object output — useCodeScannerOutput.ts.
module.exports = {
  dependencies: {
    'react-native-vision-camera-barcode-scanner': { platforms: { ios: null } },
  },
};
