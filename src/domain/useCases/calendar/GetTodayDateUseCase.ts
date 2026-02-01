import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { DateRepository } from '../../repositories/DateRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class GetTodayDateUseCase extends UseCase<void, string> {
  constructor(
    @inject(TYPES.DateRepository) private dateRepository: DateRepository,
  ) {
    super();
  }

  protected async run(): Promise<string> {
    return this.dateRepository.today();
  }
}
