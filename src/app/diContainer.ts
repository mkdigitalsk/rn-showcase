import "reflect-metadata";
import { UserApi, UserApiImpl } from "../data/network/UserApi";
import { HomeViewModel } from "../presentation/home/HomeViewModel";
import { GetUserListUseCase } from "../domain/useCases/GetUserListUseCase";
import { container } from "tsyringe";
import { UserRepository } from "../domain/repositories/UserRepository";
import { UserRepositoryImpl } from "../data/repositories/UserRepositoryImpl";
import { RemoveUserUseCase } from "../domain/useCases/RemoveUserUseCase";
import { NativeBridgeReturnValUseCase, NativeBridgeSayHeloUseCase } from "../domain/useCases/NativeBridgeUseCase";

export const TYPES = {
    UserApi: Symbol.for('UserApi'),
    UserRepository: Symbol.for('UserRepository'),
}

container.register<UserRepository>(TYPES.UserRepository, { useClass: UserRepositoryImpl });
container.register<UserApi>(TYPES.UserApi, { useClass: UserApiImpl });

export const provideHomeViewModel = () => HomeViewModel(
    container.resolve(GetUserListUseCase),
    container.resolve(RemoveUserUseCase),
    container.resolve(NativeBridgeSayHeloUseCase),
    container.resolve(NativeBridgeReturnValUseCase),
);

export { container };