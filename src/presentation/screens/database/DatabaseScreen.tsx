import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDatabaseViewModel } from './useDatabaseViewModel';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { Note, NoteSortOption } from '../../../domain/model/Note';
import { AppCard, AppTextField, OutlinedButton, ContainedButton } from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { TextBodySmallNeutral80 } from '../../components/text/bodySmall/TextBodySmall';
import { TextTitleLargeNeutral80 } from '../../components/text/titleLarge/TextTitleLarge';
import { ColumnSpacer2, ColumnSpacer4 } from '../../components/spacers/Spacers';
import { space2, space4, defaultIconSize } from '../../foundation/dimensions';

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const colors = useAppColors();

  return (
    <AppCard elevated>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <TextTitleLargeNeutral80>{note.title}</TextTitleLargeNeutral80>
          <ColumnSpacer2 />
          <TextBodyMediumNeutral80>{note.content}</TextBodyMediumNeutral80>
          <ColumnSpacer2 />
          <TextBodySmallNeutral80>{formatDate(note.createdAt)}</TextBodySmallNeutral80>
        </View>
        <Pressable onPress={() => onDelete(note.id)} hitSlop={8}>
          <Icon name="delete-outline" size={defaultIconSize} color={colors.error} />
        </Pressable>
      </View>
    </AppCard>
  );
};

export const DatabaseScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const {
    uiState,
    onSearchQueryChange,
    onSortOptionChange,
    toggleSortMenu,
    onNewNoteTitleChange,
    onNewNoteContentChange,
    addNote,
    deleteNote,
    deleteAllNotes,
  } = useDatabaseViewModel();

  const sortLabels: Record<NoteSortOption, string> = {
    [NoteSortOption.DATE_DESC]: t('database_sort_date_desc'),
    [NoteSortOption.DATE_ASC]: t('database_sort_date_asc'),
    [NoteSortOption.TITLE_ASC]: t('database_sort_title_asc'),
    [NoteSortOption.TITLE_DESC]: t('database_sort_title_desc'),
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space4, paddingBottom: 100 }}
      keyboardShouldPersistTaps="handled"
    >
      <TextHeadlineMedium color={colors.primary}>
        {t('database_title')}
      </TextHeadlineMedium>
      <ColumnSpacer2 />
      <TextBodyMediumNeutral80>{t('database_subtitle')}</TextBodyMediumNeutral80>

      <ColumnSpacer4 />

      {/* Search + Sort */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space2 }}>
        <View style={{ flex: 1 }}>
          <AppTextField
            value={uiState.searchQuery}
            onChangeText={onSearchQueryChange}
            placeholder={t('database_search_placeholder')}
            left={<Icon name="magnify" size={20} color={colors.neutral40} />}
          />
        </View>
        <Menu
          visible={uiState.showSortMenu}
          onDismiss={toggleSortMenu}
          anchor={
            <Pressable onPress={toggleSortMenu} hitSlop={8}>
              <Icon name="filter-variant" size={defaultIconSize} color={colors.neutral80} />
            </Pressable>
          }
        >
          {Object.values(NoteSortOption).map((option) => (
            <Menu.Item
              key={option}
              onPress={() => onSortOptionChange(option)}
              title={sortLabels[option]}
              leadingIcon={uiState.sortOption === option ? 'check' : undefined}
            />
          ))}
        </Menu>
      </View>

      <ColumnSpacer4 />

      {/* Add Note Card */}
      <AppCard elevated>
        <AppTextField
          value={uiState.newNoteTitle}
          onChangeText={onNewNoteTitleChange}
          placeholder={t('database_add_title_placeholder')}
        />
        <ColumnSpacer2 />
        <AppTextField
          value={uiState.newNoteContent}
          onChangeText={onNewNoteContentChange}
          placeholder={t('database_add_content_placeholder')}
          multiline
          numberOfLines={3}
        />
        <ColumnSpacer4 />
        <ContainedButton
          text={t('database_add_button')}
          onPress={addNote}
        />
      </AppCard>

      <ColumnSpacer4 />

      {/* Notes List */}
      {uiState.notes.length === 0 ? (
        <TextBodyMediumNeutral80>
          {uiState.searchQuery ? t('database_no_results') : t('database_empty')}
        </TextBodyMediumNeutral80>
      ) : (
        <>
          {uiState.notes.map((note) => (
            <View key={note.id} style={{ marginBottom: space2 }}>
              <NoteCard note={note} onDelete={deleteNote} />
            </View>
          ))}

          <ColumnSpacer4 />

          <OutlinedButton text={t('database_delete_all')} onPress={deleteAllNotes} />
        </>
      )}
    </ScrollView>
  );
};
