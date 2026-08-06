import { injectable } from 'tsyringe';
import { Share, Linking, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

@injectable()
export class PlatformClient {
  async share(text: string, title: string): Promise<void> {
    // No thumbnail: this API exposes no ClipData slot.
    await Share.share({ message: text, title }, { dialogTitle: title });
  }

  async dial(number: string): Promise<void> {
    const url = Platform.OS === 'ios' ? `telprompt:${number}` : `tel:${number}`;
    await Linking.openURL(url);
  }

  async openLink(url: string): Promise<void> {
    await Linking.openURL(url);
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    await Linking.openURL(url);
  }

  copyToClipboard(text: string): void {
    Clipboard.setString(text);
  }
}
