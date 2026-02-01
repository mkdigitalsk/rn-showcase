import { Address } from '../../domain/model/Address';
import { Mapper } from '../base/Mapper';
import { AddressDTO } from '../dto/AddressDTO';

export const AddressMapper: Mapper<AddressDTO, Address> = {
  map(from: AddressDTO): Address {
    return {
      street: from.street,
      suite: from.suite,
      city: from.city,
      zipcode: from.zipcode,
    };
  },
};
