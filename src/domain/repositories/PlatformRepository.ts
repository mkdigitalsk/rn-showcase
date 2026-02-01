export interface PlatformRepository {
  share(text: string): Promise<void>;
  dial(number: string): Promise<void>;
  openLink(url: string): Promise<void>;
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  copyToClipboard(text: string): void;
}
