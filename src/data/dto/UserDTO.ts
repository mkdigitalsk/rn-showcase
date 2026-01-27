import { AddressDTO } from './AddressDTO';

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  address: AddressDTO;
}
