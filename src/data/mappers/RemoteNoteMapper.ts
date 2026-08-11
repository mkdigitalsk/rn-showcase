import { RemoteNote } from '../../domain/model/RemoteNote';
import { Mapper } from '../base/Mapper';
import { RemoteNoteDTO } from '../dto/RemoteNoteDTO';

export const RemoteNoteMapper: Mapper<RemoteNoteDTO, RemoteNote> = {
  map(from: RemoteNoteDTO): RemoteNote {
    return {
      id: from.id,
      title: from.title,
      content: from.content,
      createdAt: from.createdAt,
      updatedAt: from.updatedAt,
      etag: from.etag,
    };
  },
};
