import "reflect-metadata";  // This is crucial for decorators to work
import { inject, injectable } from "tsyringe";
import { User } from "../models/User";
import { UserRepositoryImpl } from "../../data/repositories/UserRepositoryImpl";

@injectable()
export class GetUserListUseCase {

    constructor(
        @inject(UserRepositoryImpl) private userRepository: UserRepositoryImpl
    ) {}

    async getUsers(): Promise<User[]> {
        return this.userRepository.getUsers()
    }
}

