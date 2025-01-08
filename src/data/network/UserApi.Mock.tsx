import { User } from "../../domain/models/User";
import { UserApi } from "./UserApi";


export const mockUserApi = () => {
    const fetchUsers = jest.fn();
    const removeUser = jest.fn();
    
    (UserApi as jest.Mock).mockImplementation(() => ({
         fetchUsers,
        removeUser,
    }));

    return { fetchUsers, removeUser }
}

