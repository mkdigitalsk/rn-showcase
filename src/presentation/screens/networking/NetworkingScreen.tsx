import React from 'react';
import { View, FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';
import { appErrorKey } from '../../foundation/errors/appErrorKey';
import { useNetworkingViewModel } from './useNetworkingViewModel';
import { NoteCard } from './NoteCard';
import { CreateNoteCard } from './CreateNoteCard';
import { RemoteNote } from '../../../domain/model/RemoteNote';
import { ErrorView } from '../../components/ErrorView';
import { LoadingView } from '../../components/LoadingView';
import { AppConfirmDialog } from '../../components/AppDialog';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { ColumnSpacer4 } from '../../components/spacers/Spacers';
import { space4 } from '../../foundation/dimensions';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';

export const NetworkingScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const { uiState, onRetry, onCreate, onSave, onDelete, onStartEditing, onCancelEditing, onKeepMine, onDiscardMine } =
    useNetworkingViewModel();

  const renderItem = ({ item }: { item: RemoteNote }) => (
    <NoteCard
      note={item}
      isEditing={uiState.editing?.id === item.id}
      isSaving={uiState.isSaving}
      onStartEditing={onStartEditing}
      onCancelEditing={onCancelEditing}
      onSave={onSave}
      onDelete={onDelete}
    />
  );

  const header = (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <TextHeadlineMedium color={colors.primary}>{t('networking_title')}</TextHeadlineMedium>
          <TextBodyMediumNeutral80>{t('networking_subtitle')}</TextBodyMediumNeutral80>
        </View>
        <IconButton
          icon="refresh"
          iconColor={colors.primary}
          disabled={uiState.isLoading}
          onPress={onRetry}
          accessibilityLabel={t('networking_refresh')}
        />
      </View>
      <ColumnSpacer4 />
      <CreateNoteCard isSaving={uiState.isSaving} isLoading={uiState.isLoading} onCreate={onCreate} />
      <ColumnSpacer4 />
    </View>
  );

  const empty = (
    <View>
      {uiState.isLoading ? (
        <LoadingView />
      ) : uiState.error ? (
        <ErrorView message={t(appErrorKey(uiState.error))} onRetry={onRetry} />
      ) : (
        <TextBodyMediumNeutral80>{t('networking_empty')}</TextBodyMediumNeutral80>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={uiState.notes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={header}
        ListEmptyComponent={empty}
        ItemSeparatorComponent={ColumnSpacer4}
        contentContainerStyle={{ padding: space4 }}
        removeClippedSubviews={false}
      />

      <AppConfirmDialog
        visible={uiState.conflict !== null}
        title={t('networking_conflict_title')}
        text={t('networking_conflict_text')}
        confirmText={t('networking_conflict_keep')}
        onConfirm={() => onKeepMine(uiState.editing?.title ?? '', uiState.editing?.content ?? '')}
        onDismiss={onDiscardMine}
      />
    </View>
  );
};
