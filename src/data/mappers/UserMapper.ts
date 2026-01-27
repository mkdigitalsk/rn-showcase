import { User } from '../../domain/models/User';
import { Mapper } from '../base/Mapper';
import { UserDTO } from '../dto/UserDTO';
import { AddressMapper } from './AddressMapper';

export const UserMapper: Mapper<UserDTO, User> = {
  map(from: UserDTO): User {
    return {
      id: from.id,
      name: from.name,
      email: from.email,
      address: AddressMapper.map(from.address),
    };
  },
};
