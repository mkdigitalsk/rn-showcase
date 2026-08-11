import React, { useState } from 'react';
import { View } from 'react-native';
import { AppCard, AppTextField } from '../../components';
import { ContainedButton } from '../../components/buttons/ContainedButton';
import { ColumnSpacer2 } from '../../components/spacers/Spacers';
import { useStrings } from '../../foundation/strings';

interface CreateNoteCardProps {
  isSaving: boolean;
  isLoading: boolean;
  onCreate: (title: string, content: string) => void;
}

export const CreateNoteCard = ({ isSaving, isLoading, onCreate }: CreateNoteCardProps) => {
  const { t } = useStrings();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submit = () => {
    onCreate(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <AppCard>
      <AppTextField value={title} onChangeText={setTitle} label={t('networking_note_title')} />
      <ColumnSpacer2 />
      <AppTextField value={content} onChangeText={setContent} label={t('networking_content')} />
      <ColumnSpacer2 />
      <View style={{ alignItems: 'flex-start' }}>
        <ContainedButton
          text={t('networking_add')}
          onPress={submit}
          loading={isSaving}
          disabled={!title.trim() || isSaving || isLoading}
        />
      </View>
    </AppCard>
  );
};
