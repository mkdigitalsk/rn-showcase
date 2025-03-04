import { inject, injectable } from "tsyringe";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { TYPES } from "../../app/diContainer";

@injectable()
export class GetDetailsUseCase {

    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) { }

    call(detailId: number): Promise<User> {
        return this.userRepository.getUser(detailId)
    }

}