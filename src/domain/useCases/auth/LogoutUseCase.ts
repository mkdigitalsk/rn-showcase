import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AuthRepository } from '../../repositories/AuthRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class LogoutUseCase extends UseCase<void, void> {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepository) {
    super();
  }

  protected async run(): Promise<void> {
    return this.authRepository.logout();
  }
}
