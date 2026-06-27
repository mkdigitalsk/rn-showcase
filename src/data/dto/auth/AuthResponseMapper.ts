import { AuthResponseDTO } from './AuthResponseDTO';
import { RegisteredUser } from '../../../domain/model/RegisteredUser';

export function toRegisteredUser(dto: AuthResponseDTO): RegisteredUser {
  return {
    id: dto.user.id,
    name: dto.user.name,
    email: dto.user.email,
  };
}
