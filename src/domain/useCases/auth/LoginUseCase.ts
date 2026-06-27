import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AuthRepository } from '../../repositories/AuthRepository';
import { RegisteredUser } from '../../model/RegisteredUser';
import { TYPES } from '../../../app/diTypes';

export interface LoginParams {
  email: string;
  password: string;
}

@injectable()
export class LoginUseCase extends UseCase<LoginParams, RegisteredUser> {
  constructor(
    @inject(TYPES.AuthRepository) private authRepository: AuthRepository,
  ) {
    super();
  }

  protected async run(params: LoginParams): Promise<RegisteredUser> {
    return this.authRepository.login(params.email, params.password);
  }
}
