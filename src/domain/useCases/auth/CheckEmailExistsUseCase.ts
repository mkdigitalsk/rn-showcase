import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { AuthRepository } from '../../repositories/AuthRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class CheckEmailExistsUseCase extends UseCase<string, boolean> {
  constructor(
    @inject(TYPES.AuthRepository) private authRepository: AuthRepository,
  ) {
    super();
  }

  protected async run(email: string): Promise<boolean> {
    return this.authRepository.emailExists(email);
  }
}
