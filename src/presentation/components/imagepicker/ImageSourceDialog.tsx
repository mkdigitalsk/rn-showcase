import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppColors, useAppTheme } from '../../foundation/theme';
import { defaultIconSize, space4 } from '../../foundation/dimensions';
import { TextTitleLargePrimary } from '../text/titleLarge/TextTitleLarge';
import { TextBodyMediumNeutral100 } from '../text/bodyMedium/TextBodyMedium';

export type PickerAction = 'camera' | 'gallery';

interface ImageSourceDialogProps {
  visible: boolean;
  title: string;
  cameraLabel: string;
  galleryLabel: string;
  onAction: (action: PickerAction) => void;
  onDismiss: () => void;
}

export const ImageSourceDialog: React.FC<ImageSourceDialogProps> = ({
  visible,
  title,
  cameraLabel,
  galleryLabel,
  onAction,
  onDismiss,
}): React.JSX.Element => {
  const theme = useAppTheme();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ backgroundColor: theme.colors.surface }}>
        <Dialog.Title>
          <TextTitleLargePrimary>{title}</TextTitleLargePrimary>
        </Dialog.Title>
        <Dialog.Content>
          <OptionRow icon="camera-outline" label={cameraLabel} onPress={() => onAction('camera')} />
          <OptionRow icon="image-outline" label={galleryLabel} onPress={() => onAction('gallery')} />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

interface OptionRowProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const OptionRow = ({ icon, label, onPress }: OptionRowProps) => {
  const colors = useAppColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: space4 }}
    >
      <Icon name={icon} size={defaultIconSize} color={colors.primary} />
      <View style={{ width: space4 }} />
      <TextBodyMediumNeutral100>{label}</TextBodyMediumNeutral100>
    </TouchableOpacity>
  );
};
