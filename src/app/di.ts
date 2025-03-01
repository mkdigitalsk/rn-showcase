import "reflect-metadata";
import { UserApiImpl } from "../data/network/UserApi";
import { HomeViewModel } from "../presentation/home/HomeViewModel";
import { GetUserListUseCase } from "../domain/useCases/GetUserListUseCase";
import { UserRepositoryImpl } from "../data/repositories/UserRepositoryImpl";
import { container } from "tsyringe";

export const TYPES = {
    UserApi: Symbol.for('UserApiImpl'),
}

export const provideHomeViewModel = () => HomeViewModel(
    container.resolve(GetUserListUseCase),
);

export { container };