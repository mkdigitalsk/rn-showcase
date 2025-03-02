import { singleton } from "tsyringe"
import delay from "../../../utils/delay"
import { User, USERS_MOCK } from "../../domain/models/User"


export interface UserApi {

    logOut(): Promise<void>,

    fetchUsers(): Promise<User[]>,

    removeUser(id: number): Promise<void>,


}

@singleton()
export class UserApiImpl implements UserApi{

    async logOut(): Promise<void> {
        delay(200)
    }

    async fetchUsers(): Promise<User[]> {
        delay(500)
        return USERS_MOCK
    }

    async removeUser(id: number): Promise<void> {
        delay(200)
    }
}
