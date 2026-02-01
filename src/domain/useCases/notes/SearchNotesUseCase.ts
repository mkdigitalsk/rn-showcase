import { inject, injectable } from 'tsyringe';
import { FlowUseCase, Subscription } from '../base/UseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note, NoteSortOption } from '../../model/Note';
import { TYPES } from '../../../app/diTypes';

export interface SearchNotesParams {
  query: string;
  sortOption: NoteSortOption;
}

@injectable()
export class SearchNotesUseCase extends FlowUseCase<SearchNotesParams, Note[]> {
  constructor(
    @inject(TYPES.NoteRepository) private noteRepository: NoteRepository,
  ) {
    super();
  }

  protected doExecute(
    params: SearchNotesParams,
    emit: (value: Note[]) => void,
    _onError: (error: Error) => void,
  ): Subscription {
    const unsubscribe = this.noteRepository.subscribe(
      params.query,
      params.sortOption,
      emit,
    );
    return { unsubscribe };
  }
}
