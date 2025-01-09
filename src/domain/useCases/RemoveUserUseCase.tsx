import { UserRepository, provideUserRepository } from "../../data/repositories/UserRepository"

export type RemoveUserUseCaseType = (userId: number) => Promise<void>

export const RemoveUserUseCase: RemoveUserUseCaseType = async (userId: number, {removeUser}: UserRepository = provideUserRepository()) => removeUser(userId)
// const provideRemoveUserUseCase = (userId: number) => RemoveUserUseCase(userId,provideUserRepository())