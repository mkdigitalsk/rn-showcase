import React, { useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import QRCode from 'react-native-qrcode-svg';
import { useScannerViewModel } from './useScannerViewModel';
import { ScannerMode, CodeFormat } from './ScannerUiState';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { AppCard, AppTextField, AppSegmentedButton, ContainedButton, OutlinedButton } from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { TextBodyLargeNeutral80 } from '../../components/text/bodyLarge/TextBodyLarge';
import { ColumnSpacer2, ColumnSpacer4 } from '../../components/spacers/Spacers';
import { space4 } from '../../foundation/dimensions';

const CAMERA_HEIGHT = 350;
const QR_CODE_SIZE = 200;

const GenerateSection = ({
  format,
  inputText,
  showGeneratedCode,
  onFormatChanged,
  onTextChanged,
  generateCode,
}: {
  format: CodeFormat;
  inputText: string;
  showGeneratedCode: boolean;
  onFormatChanged: (format: string) => void;
  onTextChanged: (text: string) => void;
  generateCode: () => void;
}) => {
  const { t } = useStrings();
  const colors = useAppColors();

  return (
    <>
      <AppSegmentedButton
        options={[
          { value: CodeFormat.QR_CODE, label: t('scanner_format_qr') },
          { value: CodeFormat.BARCODE, label: t('scanner_format_barcode') },
        ]}
        selectedValue={format}
        onValueChanged={onFormatChanged}
      />
      <ColumnSpacer4 />
      <AppCard elevated>
        <AppTextField
          value={inputText}
          onChangeText={onTextChanged}
          placeholder={t('scanner_input_placeholder')}
        />
        <ColumnSpacer4 />
        <ContainedButton text={t('scanner_generate_button')} onPress={generateCode} />
      </AppCard>
      {showGeneratedCode && inputText.trim() && (
        <>
          <ColumnSpacer4 />
          <AppCard elevated>
            <View style={styles.codeContainer}>
              <QRCode
                value={inputText}
                size={QR_CODE_SIZE}
                color={colors.neutral80}
                backgroundColor={colors.surface}
              />
            </View>
          </AppCard>
        </>
      )}
    </>
  );
};

const ScanSection = ({
  onCodeScanned,
  scannedResult,
  clearScannedResult,
}: {
  onCodeScanned: (result: string) => void;
  scannedResult: string | null;
  clearScannedResult: () => void;
}) => {
  const { t } = useStrings();
  const colors = useAppColors();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8', 'code-128', 'code-39'],
    onCodeScanned: useCallback((codes) => {
      const value = codes[0]?.value;
      if (value) {
        onCodeScanned(value);
      }
    }, [onCodeScanned]),
  });

  if (!hasPermission) {
    return (
      <AppCard elevated>
        <TextBodyMediumNeutral80>{t('scanner_permission_denied')}</TextBodyMediumNeutral80>
        <ColumnSpacer4 />
        <OutlinedButton text={t('scanner_request_permission')} onPress={requestPermission} />
      </AppCard>
    );
  }

  if (!device) {
    return (
      <AppCard elevated>
        <TextBodyMediumNeutral80>{t('scanner_no_camera')}</TextBodyMediumNeutral80>
      </AppCard>
    );
  }

  return (
    <>
      <View style={[styles.cameraContainer, { borderColor: colors.outline }]}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      </View>
      {scannedResult && (
        <>
          <ColumnSpacer4 />
          <AppCard elevated>
            <TextBodyLargeNeutral80>{t('scanner_scanned_result')}</TextBodyLargeNeutral80>
            <ColumnSpacer2 />
            <TextBodyMediumNeutral80>{scannedResult}</TextBodyMediumNeutral80>
            <ColumnSpacer4 />
            <OutlinedButton text={t('scanner_clear_result')} onPress={clearScannedResult} />
          </AppCard>
        </>
      )}
    </>
  );
};

export const ScannerScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const {
    uiState,
    onModeChanged,
    onFormatChanged,
    onTextChanged,
    generateCode,
    onCodeScanned,
    clearScannedResult,
  } = useScannerViewModel();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space4, paddingBottom: 100 }}
      keyboardShouldPersistTaps="handled"
    >
      <TextHeadlineMedium color={colors.primary}>
        {t('scanner_title')}
      </TextHeadlineMedium>
      <ColumnSpacer2 />
      <TextBodyMediumNeutral80>{t('scanner_subtitle')}</TextBodyMediumNeutral80>

      <ColumnSpacer4 />

      <AppSegmentedButton
        options={[
          { value: ScannerMode.GENERATE, label: t('scanner_mode_generate') },
          { value: ScannerMode.SCAN, label: t('scanner_mode_scan') },
        ]}
        selectedValue={uiState.mode}
        onValueChanged={onModeChanged}
      />

      <ColumnSpacer4 />

      {uiState.mode === ScannerMode.GENERATE ? (
        <GenerateSection
          format={uiState.format}
          inputText={uiState.inputText}
          showGeneratedCode={uiState.showGeneratedCode}
          onFormatChanged={onFormatChanged}
          onTextChanged={onTextChanged}
          generateCode={generateCode}
        />
      ) : (
        <ScanSection
          onCodeScanned={onCodeScanned}
          scannedResult={uiState.scannedResult}
          clearScannedResult={clearScannedResult}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  codeContainer: {
    alignItems: 'center',
    paddingVertical: space4,
  },
  cameraContainer: {
    height: CAMERA_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
});
