import "reflect-metadata";

import { inject, singleton } from "tsyringe";
import { User } from "../../domain/models/User";
import { UserApi } from "../network/UserApi";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { TYPES } from "../../app/diContainer";

@singleton()
export class UserRepositoryImpl implements UserRepository {

    constructor(@inject(TYPES.UserApi) private api: UserApi) { }

    async getUsers(): Promise<User[]> { return this.api.fetchUsers() }
    async getUser(id: number): Promise<User> {
        // TODO: Implement API call
        return { id: 1, name: "Miro" }
    }

    async removeUser(id: number): Promise<void> {
        return this.api.removeUser(id)
    }
}
