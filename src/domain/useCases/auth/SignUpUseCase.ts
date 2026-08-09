import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AuthRepository } from '../../repositories/AuthRepository';
import { SignedUpUser } from '../../model/SignedUpUser';
import { TYPES } from '../../../app/diTypes';

export interface SignUpParams {
  email: string;
  password: string;
}

@injectable()
export class SignUpUseCase extends UseCase<SignUpParams, SignedUpUser> {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepository) {
    super();
  }

  protected async run(params: SignUpParams): Promise<SignedUpUser> {
    return this.authRepository.signUp(params.email, params.password);
  }
}
