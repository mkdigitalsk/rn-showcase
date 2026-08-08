import { AuthResponseDTO } from './AuthResponseDTO';
import { SignedUpUser } from '../../../domain/model/SignedUpUser';

export function toSignedUpUser(dto: AuthResponseDTO): SignedUpUser {
  return {
    id: dto.user.id,
    name: dto.user.name,
    email: dto.user.email,
  };
}
