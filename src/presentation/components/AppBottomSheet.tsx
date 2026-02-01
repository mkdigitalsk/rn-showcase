import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../foundation/theme';
import { space4 } from '../foundation/dimensions';

interface AppBottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

export const AppBottomSheet: React.FC<AppBottomSheetProps> = ({
  visible,
  onDismiss,
  children,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        {children}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: space4,
    marginHorizontal: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
