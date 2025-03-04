import { User } from "../models/User"

export interface UserRepository {
    getUsers: () =>  Promise<User[]>   
    getUser: (id: number) => Promise<User>   
    removeUser: (id: number) => Promise<void>


}
