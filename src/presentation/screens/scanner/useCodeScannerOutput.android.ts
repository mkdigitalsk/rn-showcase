import { useCallback } from 'react';
import type { CameraOutput } from 'react-native-vision-camera';
import { useBarcodeScannerOutput, type Barcode } from 'react-native-vision-camera-barcode-scanner';
import { Logger } from '../../../util/Logger';

const logger = new Logger();

/** The camera output that reads QR, EAN and Code 128/39 codes, on Android through ML Kit. */
export const useCodeScannerOutput = (onCodeScan: (value: string) => void): CameraOutput =>
  useBarcodeScannerOutput({
    barcodeFormats: ['qr-code', 'ean-13', 'ean-8', 'code-128', 'code-39'],
    onBarcodeScanned: useCallback(
      (barcodes: Barcode[]) => {
        const value = barcodes[0]?.rawValue;
        if (value) {
          onCodeScan(value);
        }
      },
      [onCodeScan]
    ),
    onError: useCallback((error: Error) => logger.e('The barcode scanner failed', error), []),
  });
