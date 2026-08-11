import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AuthRepository } from '../../repositories/AuthRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class IsDemoAccountUseCase extends UseCase<void, boolean | undefined> {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepository) {
    super();
  }

  protected async run(): Promise<boolean | undefined> {
    return this.authRepository.isDemoAccount();
  }
}
