import { useCallback, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary, type ImagePickerResponse } from 'react-native-image-picker';
import type { AvatarState } from '../AvatarView';
import type { PickerAction } from './ImageSourceDialog';

const OPTIONS = { mediaType: 'photo', quality: 0.8, selectionLimit: 1 } as const;

// Declaring CAMERA in the manifest makes ACTION_IMAGE_CAPTURE throw until the permission is granted,
// even though the photo is taken by another app. iOS prompts on its own from the usage description.
const hasCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const useImagePicker = () => {
  const [avatarState, setAvatarState] = useState<AvatarState>({ type: 'empty' });
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = useCallback(() => setDialogVisible(true), []);
  const dismissDialog = useCallback(() => setDialogVisible(false), []);

  const apply = useCallback((response: ImagePickerResponse) => {
    const uri = response.assets?.[0]?.uri;
    setAvatarState(uri ? { type: 'loaded', uri } : { type: 'empty' });
  }, []);

  const pick = useCallback(
    (action: PickerAction) => {
      setDialogVisible(false);
      void (async () => {
        if (action === 'camera' && !(await hasCameraPermission())) return;
        setAvatarState({ type: 'loading' });
        const response = await (action === 'camera' ? launchCamera(OPTIONS) : launchImageLibrary(OPTIONS));
        apply(response);
      })();
    },
    [apply]
  );

  return { avatarState, dialogVisible, showDialog, dismissDialog, pick };
};
