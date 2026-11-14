import { useCallback } from 'react';
import { isScannedCode, useObjectOutput, type CameraOutput, type ScannedObject } from 'react-native-vision-camera';

/**
 * The camera output that reads QR, EAN and Code 128/39 codes, on iOS through AVFoundation's own scanner.
 * Android reads them with ML Kit — useCodeScannerOutput.android.ts.
 */
export const useCodeScannerOutput = (onCodeScan: (value: string) => void): CameraOutput =>
  useObjectOutput({
    types: ['qr', 'ean-13', 'ean-8', 'code-128', 'code-39'],
    onObjectsScanned: useCallback(
      (objects: ScannedObject[]) => {
        const value = objects.find(isScannedCode)?.value;
        if (value) {
          onCodeScan(value);
        }
      },
      [onCodeScan]
    ),
  });
