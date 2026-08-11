import { useState, useCallback } from 'react';
import { ScannerUiState, initialScannerUiState, ScannerMode, CodeFormat } from './ScannerUiState';

export const useScannerViewModel = () => {
  const [uiState, setUiState] = useState<ScannerUiState>(initialScannerUiState);

  const onModeChange = useCallback((mode: string) => {
    setUiState(prev => ({
      ...prev,
      mode: mode as ScannerMode,
      scannedResult: null,
    }));
  }, []);

  const onFormatChange = useCallback((format: string) => {
    setUiState(prev => ({
      ...prev,
      format: format as CodeFormat,
      showGeneratedCode: false,
    }));
  }, []);

  const onTextChange = useCallback((text: string) => {
    setUiState(prev => ({
      ...prev,
      inputText: text,
      showGeneratedCode: false,
    }));
  }, []);

  const generateCode = useCallback(() => {
    if (!uiState.inputText.trim()) {
      return;
    }
    setUiState(prev => ({ ...prev, showGeneratedCode: true }));
  }, [uiState.inputText]);

  const onCodeScan = useCallback((result: string) => {
    setUiState(prev => {
      if (prev.scannedResult === result) {
        return prev;
      }
      return { ...prev, scannedResult: result };
    });
  }, []);

  const clearScannedResult = useCallback(() => {
    setUiState(prev => ({ ...prev, scannedResult: null }));
  }, []);

  return {
    uiState,
    onModeChange,
    onFormatChange,
    onTextChange,
    generateCode,
    onCodeScan,
    clearScannedResult,
  };
};
