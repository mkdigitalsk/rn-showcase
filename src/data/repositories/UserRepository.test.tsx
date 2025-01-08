
jest.mock('../network/UserApi')
// import { mockUserApi } from '../network/UserApi.Mock';
import UserApi from '../network/UserApi';
import { UserRepository, UserRepositoryImpl } from './UserRepository';

let classUnderTest: UserRepository
let api: jest.MockedObjectDeep<UserApi>

beforeEach(() => {
    jest.clearAllMocks();
    api = jest.mocked(UserApi).prototype
    classUnderTest = UserRepositoryImpl(api)

});

afterEach(() => {
    jest.resetAllMocks();
});



test('should call fetchUsers and return data', async () => {
    // Given
    const mockUsers = [{ id: 1, name: 'John' }];
    api.fetchUsers.mockResolvedValue(mockUsers);
    // When
    const result = await classUnderTest.getUsers();
    // Then
    expect(api.fetchUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
});

test('should call removeUser with correct ID', async () => {
    // Given
    const userId = 1;
    // When
    await classUnderTest.removeUser(userId);
    // Then
    expect(api.removeUser).toHaveBeenCalledWith(userId);
});

test('should handle removeUser errors', async () => {
    // Given
    api.removeUser.mockRejectedValue(new Error('Remove failed'));
    // When, Then
    await expect(classUnderTest.removeUser(1)).rejects.toThrow('Remove failed');
});
