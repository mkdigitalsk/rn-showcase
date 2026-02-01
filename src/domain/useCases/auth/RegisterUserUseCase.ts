import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AuthRepository } from '../../repositories/AuthRepository';
import { RegisteredUser } from '../../model/RegisteredUser';
import { TYPES } from '../../../app/diTypes';

export interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class RegisterUserUseCase extends UseCase<RegisterUserParams, RegisteredUser> {
  constructor(
    @inject(TYPES.AuthRepository) private authRepository: AuthRepository,
  ) {
    super();
  }

  protected async run(params: RegisterUserParams): Promise<RegisteredUser> {
    return this.authRepository.register(params.name, params.email, params.password);
  }
}
