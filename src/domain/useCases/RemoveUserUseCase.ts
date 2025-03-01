import { UserRepositoryImpl } from "../../data/repositories/UserRepositoryImpl"

export class RemoveUserUseCase {

    constructor (public readonly repository: UserRepositoryImpl) {}

    async removeUser(userId: number): Promise<void> {
       return this.repository.removeUser(userId)
    }
}