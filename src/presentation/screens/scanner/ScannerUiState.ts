export enum ScannerMode {
  GENERATE = 'GENERATE',
  SCAN = 'SCAN',
}

export enum CodeFormat {
  QR_CODE = 'QR_CODE',
  BARCODE = 'BARCODE',
}

export interface ScannerUiState {
  mode: ScannerMode;
  format: CodeFormat;
  inputText: string;
  showGeneratedCode: boolean;
  scannedResult: string | null;
}

export const initialScannerUiState: ScannerUiState = {
  mode: ScannerMode.GENERATE,
  format: CodeFormat.QR_CODE,
  inputText: '',
  showGeneratedCode: false,
  scannedResult: null,
};
