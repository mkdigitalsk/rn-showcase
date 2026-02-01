import React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { useAppTheme } from '../foundation/theme';
import { TextTitleLargePrimary } from './text/titleLarge/TextTitleLarge';
import { TextBodyMediumNeutral80 } from './text/bodyMedium/TextBodyMedium';
import { AppTextButton } from './buttons/AppTextButton';

interface AppConfirmDialogProps {
  visible: boolean;
  title?: string;
  text: string;
  confirmText?: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const AppConfirmDialog: React.FC<AppConfirmDialogProps> = ({
  visible,
  title,
  text,
  confirmText = 'OK',
  onConfirm,
  onDismiss,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: theme.colors.neutral0 }}
      >
        {title && (
          <Dialog.Title>
            <TextTitleLargePrimary>{title}</TextTitleLargePrimary>
          </Dialog.Title>
        )}
        <Dialog.Content>
          <TextBodyMediumNeutral80>{text}</TextBodyMediumNeutral80>
        </Dialog.Content>
        <Dialog.Actions>
          <AppTextButton text={confirmText} onPress={onConfirm} />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

interface AppAlertDialogProps {
  visible: boolean;
  title?: string;
  text: string;
  confirmText?: string;
  dismissText?: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const AppAlertDialog: React.FC<AppAlertDialogProps> = ({
  visible,
  title,
  text,
  confirmText = 'OK',
  dismissText = 'Cancel',
  onConfirm,
  onDismiss,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: theme.colors.neutral0 }}
      >
        {title && (
          <Dialog.Title>
            <TextTitleLargePrimary>{title}</TextTitleLargePrimary>
          </Dialog.Title>
        )}
        <Dialog.Content>
          <TextBodyMediumNeutral80>{text}</TextBodyMediumNeutral80>
        </Dialog.Content>
        <Dialog.Actions>
          <AppTextButton text={dismissText} onPress={onDismiss} />
          <AppTextButton text={confirmText} onPress={onConfirm} />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
