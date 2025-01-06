import { User } from "../models/User";
import { UserRepository, provideUserRepository } from "../../data/repositories/UserRepository";

export type GetUserListUseCaseType = () => Promise<User[]>
export type RemoveUserUseCaseType = (userId: number) => Promise<void>
export const GetUserListUseCase: GetUserListUseCaseType = async ({getUsers}: UserRepository = provideUserRepository()) => getUsers()
export const RemoveUserUseCase: RemoveUserUseCaseType = async (userId: number, {removeUser}: UserRepository = provideUserRepository()) => removeUser(userId)


// const provideGetUserListUseCase = () => GetUserListUseCase(provideUserRepository())
// const provideRemoveUserUseCase = (userId: number) => RemoveUserUseCase(userId,provideUserRepository())