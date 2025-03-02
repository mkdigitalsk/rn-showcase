import { injectable } from "tsyringe"
import { UserRepositoryImpl } from "../../data/repositories/UserRepositoryImpl"

@injectable()
export class RemoveUserUseCase {

    constructor (public readonly repository: UserRepositoryImpl) {}

    async call(userId: number): Promise<void> {
       return this.repository.removeUser(userId)
    }
}