import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDatabaseViewModel } from './useDatabaseViewModel';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { Note, NoteSortOption } from '../../../domain/model/Note';
import { AppCard, AppTextField, AppSearchField, OutlinedButton, ContainedButton } from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { TextBodySmallNeutral80 } from '../../components/text/bodySmall/TextBodySmall';
import { TextTitleLargeNeutral80 } from '../../components/text/titleLarge/TextTitleLarge';
import { ColumnSpacer2, ColumnSpacer4 } from '../../components/spacers/Spacers';
import { space2, space4, defaultIconSize } from '../../foundation/dimensions';
import { formatDate } from '../../../util/formatDate';

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
      <TextHeadlineMedium color={colors.primary}>{t('database_title')}</TextHeadlineMedium>
      <ColumnSpacer2 />
      <TextBodyMediumNeutral80>{t('database_subtitle')}</TextBodyMediumNeutral80>

      <ColumnSpacer4 />

      <SearchAndSortRow
        query={uiState.searchQuery}
        placeholder={t('database_search_placeholder')}
        sortOption={uiState.sortOption}
        sortLabels={sortLabels}
        menuVisible={uiState.showSortMenu}
        onQueryChange={onSearchQueryChange}
        onToggleMenu={toggleSortMenu}
        onSortOptionChange={onSortOptionChange}
      />

      <ColumnSpacer4 />

      <AddNoteCard
        title={uiState.newNoteTitle}
        content={uiState.newNoteContent}
        titlePlaceholder={t('database_add_title_placeholder')}
        contentPlaceholder={t('database_add_content_placeholder')}
        submitText={t('database_add_button')}
        onTitleChange={onNewNoteTitleChange}
        onContentChange={onNewNoteContentChange}
        onSubmit={addNote}
      />

      <ColumnSpacer4 />

      <NotesList
        notes={uiState.notes}
        emptyText={uiState.searchQuery ? t('database_no_results') : t('database_empty')}
        deleteAllText={t('database_delete_all')}
        onDelete={deleteNote}
        onDeleteAll={deleteAllNotes}
      />
    </ScrollView>
  );
};

interface SearchAndSortRowProps {
  query: string;
  placeholder: string;
  sortOption: NoteSortOption;
  sortLabels: Record<NoteSortOption, string>;
  menuVisible: boolean;
  onQueryChange: (value: string) => void;
  onToggleMenu: () => void;
  onSortOptionChange: (option: NoteSortOption) => void;
}

const SearchAndSortRow = ({
  query,
  placeholder,
  sortOption,
  sortLabels,
  menuVisible,
  onQueryChange,
  onToggleMenu,
  onSortOptionChange,
}: SearchAndSortRowProps) => {
  const colors = useAppColors();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space2 }}>
      <View style={{ flex: 1 }}>
        <AppSearchField value={query} onChangeText={onQueryChange} placeholder={placeholder} />
      </View>
      <Menu
        visible={menuVisible}
        onDismiss={onToggleMenu}
        anchor={
          <Pressable onPress={onToggleMenu} hitSlop={8}>
            <Icon name="filter-variant" size={defaultIconSize} color={colors.neutral80} />
          </Pressable>
        }
      >
        {Object.values(NoteSortOption).map(option => (
          <Menu.Item
            key={option}
            onPress={() => onSortOptionChange(option)}
            title={sortLabels[option]}
            leadingIcon={sortOption === option ? 'check' : undefined}
          />
        ))}
      </Menu>
    </View>
  );
};

interface AddNoteCardProps {
  title: string;
  content: string;
  titlePlaceholder: string;
  contentPlaceholder: string;
  submitText: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: () => void;
}

const AddNoteCard = ({
  title,
  content,
  titlePlaceholder,
  contentPlaceholder,
  submitText,
  onTitleChange,
  onContentChange,
  onSubmit,
}: AddNoteCardProps) => {
  return (
    <AppCard elevated>
      <AppTextField value={title} onChangeText={onTitleChange} placeholder={titlePlaceholder} />
      <ColumnSpacer2 />
      <AppTextField value={content} onChangeText={onContentChange} placeholder={contentPlaceholder} />
      <ColumnSpacer4 />
      <ContainedButton text={submitText} onPress={onSubmit} />
    </AppCard>
  );
};

interface NotesListProps {
  notes: Note[];
  emptyText: string;
  deleteAllText: string;
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
}

const NotesList = ({ notes, emptyText, deleteAllText, onDelete, onDeleteAll }: NotesListProps) => {
  if (notes.length === 0) {
    return <TextBodyMediumNeutral80>{emptyText}</TextBodyMediumNeutral80>;
  }

  return (
    <>
      {notes.map(note => (
        <View key={note.id} style={{ marginBottom: space2 }}>
          <NoteCard note={note} onDelete={onDelete} />
        </View>
      ))}

      <ColumnSpacer4 />

      <OutlinedButton text={deleteAllText} onPress={onDeleteAll} />
    </>
  );
};
