import "reflect-metadata";  // This is crucial for decorators to work
import { inject, injectable } from "tsyringe";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { TYPES } from "../../app/di";

@injectable()
export class GetUserListUseCase {

    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) { }

    async call(): Promise<User[]> {
        return this.userRepository.getUsers()
    }
}

