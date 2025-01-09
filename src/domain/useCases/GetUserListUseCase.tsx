import { User } from "../models/User";
import { UserRepository, provideUserRepository } from "../../data/repositories/UserRepository";

export type GetUserListUseCaseType = () => Promise<User[]>
export const GetUserListUseCase: GetUserListUseCaseType = async ({ getUsers }: UserRepository = provideUserRepository()) => getUsers()

// const provideGetUserListUseCase = () => GetUserListUseCase(provideUserRepository())
