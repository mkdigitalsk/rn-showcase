import delay from "../../../utils/delay"
import { User, USERS_MOCK } from "../../domain/models/User"



export default class UserApi {

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

export const provideUserApi = () => new UserApi()