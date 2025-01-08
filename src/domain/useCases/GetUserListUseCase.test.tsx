jest.mock('./GetUserListUseCase')
import { createMock } from "../../../__tests__/base/test"
import { UserRepository, UserRepositoryImpl } from "../../data/repositories/UserRepository"
import {  GetUserListUseCaseType } from "./GetUserListUseCase"

let classUnderTest: GetUserListUseCaseType
let userRepository : jest.MockedObjectDeep<UserRepository>

beforeEach(()=>{
    // userRepository = createMock(UserRepositoryImpl)
})