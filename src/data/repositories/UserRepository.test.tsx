jest.mock('../network/UserApi')

import { instance, mock, reset, verify, when } from 'ts-mockito';
import testScenario from '../../../utils/testScenario';
import { UserRepository, UserRepositoryImpl } from './UserRepository';
import { UserApi } from '../network/UserApi';

let classUnderTest: UserRepository
let api: UserApi;
let apiInstance: UserApi;

beforeEach(() => {
    api = mock<UserApi>()
    apiInstance = instance(api)
    classUnderTest = UserRepositoryImpl(apiInstance)
});

afterEach(() => reset(api));

test('fetch users success', async () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    await testScenario({
        given: () => when(api.fetchUsers()).thenResolve(mockUsers),
        whenAction: () => classUnderTest.getUsers(),
        then: (actual) => {
            verify(api.fetchUsers()).once();
            expect(actual).toEqual(mockUsers);
        },
    });
});

test('should call removeUser with correct ID', async () => {
    const userId = 1;
    await testScenario({
        whenAction: () => classUnderTest.removeUser(userId),
        then: () => verify(api.removeUser(userId)).once(),
    });
});

test('should handle removeUser errors', async () => {
    const msg = 'Remove failed';
    when(api.removeUser(1)).thenThrow(new Error(msg));
    await expect(classUnderTest.removeUser(1)).rejects.toThrow(msg);
    verify(api.removeUser(1)).once();
});

test('should return an empty array when no users found', async () => {
    await testScenario({
        given: () => when(api.fetchUsers()).thenResolve([]),
        whenAction: () => classUnderTest.getUsers(),
        then: (actual) => {
            expect(actual).toEqual([]);
            verify(api.fetchUsers()).once();
        },
    });
});
