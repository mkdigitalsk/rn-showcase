import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AuthRepository } from '../../repositories/AuthRepository';
import { SignedUpUser } from '../../model/SignedUpUser';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class SignInWithTokenUseCase extends UseCase<void, SignedUpUser | null> {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepository) {
    super();
  }

  protected async run(): Promise<SignedUpUser | null> {
    return this.authRepository.signInWithToken();
  }
}
