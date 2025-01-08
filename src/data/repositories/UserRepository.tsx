import delay from "../../../utils/delay";
import { User } from "../../domain/models/User";
import UserApi, { provideUserApi } from "../network/UserApi";

export const UserRepositoryImpl = (api: UserApi) : UserRepository  => ({
    getUsers: async () =>  api.fetchUsers(),
    removeUser: async (id: number) => api.removeUser(id),
})


export type UserRepository = {
    getUsers: () => Promise<User[]>
    removeUser: (id: number) => Promise<void>
}

export const provideUserRepository = () : UserRepository => UserRepositoryImpl(provideUserApi())