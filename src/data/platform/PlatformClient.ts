import { injectable } from 'tsyringe';
import { Share, Linking, Platform } from 'react-native';
import RNShare from 'react-native-share';
import { SHARE_ICON_BASE64 } from '../../presentation/assets/shareIcon';
import Clipboard from '@react-native-clipboard/clipboard';

@injectable()
export class PlatformClient {
  async share(text: string, title: string, url: string): Promise<void> {
    if (Platform.OS === 'ios') {
      // Without linkMetadata iOS scrapes the page itself and, until that lands, shows a compass and
      // the bare host — RN's own Share API cannot set it. A url placeholder re-enables that scrape and
      // its result overwrites the icon we just supplied, so the placeholder carries the text instead.
      await RNShare.open({
        activityItemSources: [
          {
            placeholderItem: { type: 'text', content: `${text}\n\n${url}` },
            item: { default: { type: 'text', content: `${text}\n\n${url}` } },
            subject: { default: title },
            linkMetadata: { title, originalUrl: url, url, base64Icon: SHARE_ICON_BASE64 },
          },
        ],
      });
      return;
    }

    await Share.share({ message: `${text}\n\n${url}`, title }, { dialogTitle: title });
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
