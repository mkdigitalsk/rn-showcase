import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AuthRepository } from '../../repositories/AuthRepository';
import { SignedUpUser } from '../../model/SignedUpUser';
import { TYPES } from '../../../app/diTypes';

export interface LoginParams {
  email: string;
  password: string;
}

@injectable()
export class SignInUseCase extends UseCase<LoginParams, SignedUpUser> {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepository) {
    super();
  }

  protected async run(params: LoginParams): Promise<SignedUpUser> {
    return this.authRepository.signIn(params.email, params.password);
  }
}
