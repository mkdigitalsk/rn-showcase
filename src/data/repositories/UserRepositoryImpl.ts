import "reflect-metadata";

import { inject, injectable, singleton } from "tsyringe";
import { User } from "../../domain/models/User";
import { UserApiImpl } from "../network/UserApi";

@singleton()
export class UserRepositoryImpl  {

    constructor(@inject(UserApiImpl) private api: UserApiImpl) { }

    async getUsers(): Promise<User[]> { return this.api.fetchUsers() }
    async removeUser(id: number): Promise<void> {
        return this.api.removeUser(id)
    }
}
