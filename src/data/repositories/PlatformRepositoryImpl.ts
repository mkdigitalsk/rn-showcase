import { inject, injectable } from 'tsyringe';
import { PlatformRepository } from '../../domain/repositories/PlatformRepository';
import { PlatformClient } from '../platform/PlatformClient';
import { TYPES } from '../../app/diTypes';

@injectable()
export class PlatformRepositoryImpl implements PlatformRepository {
  constructor(
    @inject(TYPES.PlatformClient) private client: PlatformClient,
  ) {}

  async share(text: string): Promise<void> {
    return this.client.share(text);
  }

  async dial(number: string): Promise<void> {
    return this.client.dial(number);
  }

  async openLink(url: string): Promise<void> {
    return this.client.openLink(url);
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    return this.client.sendEmail(to, subject, body);
  }

  copyToClipboard(text: string): void {
    this.client.copyToClipboard(text);
  }
}
