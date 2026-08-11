import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { RemoteNote } from '../../../domain/model/RemoteNote';
import { AppCard, AppTextField } from '../../components';
import { ContainedButton } from '../../components/buttons/ContainedButton';
import { OutlinedButton } from '../../components/buttons/OutlinedButton';
import { TextTitleLargeNeutral80 } from '../../components/text/titleLarge/TextTitleLarge';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { ColumnSpacer2 } from '../../components/spacers/Spacers';
import { space4 } from '../../foundation/dimensions';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';

interface NoteCardProps {
  note: RemoteNote;
  isEditing: boolean;
  isSaving: boolean;
  onStartEditing: (note: RemoteNote) => void;
  onCancelEditing: () => void;
  onSave: (id: number, title: string, content: string, etag: string) => void;
  onDelete: (id: number) => void;
}

export const NoteCard = ({ note, isEditing, isSaving, onStartEditing, onCancelEditing, onSave, onDelete }: NoteCardProps) => {
  const colors = useAppColors();
  const { t } = useStrings();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  if (!isEditing) {
    return (
      <AppCard>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <TextTitleLargeNeutral80>{note.title}</TextTitleLargeNeutral80>
            <TextBodyMediumNeutral80>{note.content}</TextBodyMediumNeutral80>
          </View>
          <IconButton icon="pencil" iconColor={colors.primary} onPress={() => onStartEditing(note)} />
          <IconButton icon="delete" iconColor={colors.primary} onPress={() => onDelete(note.id)} />
        </View>
      </AppCard>
    );
  }

  return (
    <AppCard>
      <AppTextField value={title} onChangeText={setTitle} label={t('networking_note_title')} />
      <ColumnSpacer2 />
      <AppTextField value={content} onChangeText={setContent} label={t('networking_content')} />
      <ColumnSpacer2 />
      <View style={{ flexDirection: 'row', gap: space4 }}>
        <OutlinedButton text={t('networking_cancel')} onPress={onCancelEditing} />
        <ContainedButton
          text={t('networking_save')}
          onPress={() => onSave(note.id, title, content, note.etag)}
          loading={isSaving}
          disabled={isSaving}
        />
      </View>
    </AppCard>
  );
};
