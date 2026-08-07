import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AuthRepository } from '../../repositories/AuthRepository';
import { RegisteredUser } from '../../model/RegisteredUser';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class LoginWithTokenUseCase extends UseCase<void, RegisteredUser | null> {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepository) {
    super();
  }

  protected async run(): Promise<RegisteredUser | null> {
    return this.authRepository.loginWithToken();
  }
}
