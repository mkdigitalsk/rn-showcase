import { AuthResponseDTO } from './AuthResponseDTO';
import { SignedUpUser } from '../../../domain/model/SignedUpUser';

export function toSignedUpUser(dto: AuthResponseDTO): SignedUpUser {
  return {
    id: dto.user.id,
    email: dto.user.email,
    demo: dto.user.demo,
  };
}
