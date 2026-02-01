import React from 'react';
import { View, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useStorageViewModel } from './useStorageViewModel';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { AppCard, OutlinedButton } from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { TextTitleLargeNeutral80 } from '../../components/text/titleLarge/TextTitleLarge';
import { ColumnSpacer2, ColumnSpacer4 } from '../../components/spacers/Spacers';
import { space4 } from '../../foundation/dimensions';

const COUNTER_ICON_SIZE = 28;

interface CounterCardProps {
  label: string;
  hint: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CounterCard = ({ label, hint, value, onIncrement, onDecrement }: CounterCardProps) => {
  const colors = useAppColors();

  return (
    <AppCard elevated>
      <TextTitleLargeNeutral80>{label}</TextTitleLargeNeutral80>
      <ColumnSpacer2 />
      <TextBodyMediumNeutral80>{hint}</TextBodyMediumNeutral80>
      <ColumnSpacer4 />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton
          icon="minus"
          size={COUNTER_ICON_SIZE}
          iconColor={colors.primary}
          onPress={onDecrement}
        />
        <TextHeadlineMedium color={colors.primary}>
          {String(value)}
        </TextHeadlineMedium>
        <IconButton
          icon="plus"
          size={COUNTER_ICON_SIZE}
          iconColor={colors.primary}
          onPress={onIncrement}
        />
      </View>
    </AppCard>
  );
};

export const StorageScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const {
    uiState,
    incrementSessionCounter,
    decrementSessionCounter,
    incrementPersistentCounter,
    decrementPersistentCounter,
    clearSession,
  } = useStorageViewModel();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space4, paddingBottom: 100 }}
    >
      <TextHeadlineMedium color={colors.primary}>
        {t('storage_title')}
      </TextHeadlineMedium>
      <ColumnSpacer2 />
      <TextBodyMediumNeutral80>{t('storage_subtitle')}</TextBodyMediumNeutral80>

      <ColumnSpacer4 />

      <CounterCard
        label={t('storage_session_label')}
        hint={t('storage_session_hint')}
        value={uiState.sessionCounter}
        onIncrement={incrementSessionCounter}
        onDecrement={decrementSessionCounter}
      />

      <ColumnSpacer4 />

      <CounterCard
        label={t('storage_persistent_label')}
        hint={t('storage_persistent_hint')}
        value={uiState.persistentCounter}
        onIncrement={incrementPersistentCounter}
        onDecrement={decrementPersistentCounter}
      />

      <ColumnSpacer4 />

      <OutlinedButton
        text={t('storage_clear_session')}
        onPress={clearSession}
      />
    </ScrollView>
  );
};
