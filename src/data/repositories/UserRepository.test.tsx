import { UserApi } from '../network/UserApi';
import { mockUserApi } from '../network/UserApi.Mock';
import { UserRepository, UserRepositoryImpl } from './UserRepository';

jest.mock('../network/UserApi');


let userRepository: UserRepository;
let fetchUsers: any
let removeUser: any

beforeEach(() => {
    jest.clearAllMocks();
    ({ fetchUsers, removeUser } = mockUserApi());
    userRepository = UserRepositoryImpl(new UserApi());
});

afterEach(() => {
    jest.resetAllMocks();
});



test('should call fetchUsers and return data', async () => {
    // Given
    const mockUsers = [{ id: 1, name: 'John' }];
    fetchUsers.mockResolvedValue(mockUsers);

    // When
    const result = await userRepository.getUsers();

    // Then
    expect(fetchUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
});

test('should call removeUser with correct ID', async () => {
    // Given
    const userId = 1;
    // When
    await userRepository.removeUser(userId);
    // Then
    expect(removeUser).toHaveBeenCalledWith(userId);
});

test('should handle removeUser errors', async () => {
    removeUser.mockRejectedValue(new Error('Remove failed'));

    await expect(userRepository.removeUser(1)).rejects.toThrow('Remove failed');
});
