import { User } from '../../domain/model/User';
import { Mapper } from '../base/Mapper';
import { UserDTO } from '../dto/UserDTO';

export const UserMapper: Mapper<UserDTO, User> = {
  map(from: UserDTO): User {
    return {
      id: from.id,
      email: from.email,
      createdAt: from.createdAt,
    };
  },
};
