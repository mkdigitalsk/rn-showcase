import "reflect-metadata";
import { UserApi, UserApiImpl } from "../data/network/UserApi";
import { container } from "tsyringe";
import { UserRepository } from "../domain/repositories/UserRepository";
import { UserRepositoryImpl } from "../data/repositories/UserRepositoryImpl";

export const TYPES = {
    UserApi: Symbol.for('UserApi'),
    UserRepository: Symbol.for('UserRepository'),
}

container.register<UserRepository>(TYPES.UserRepository, { useClass: UserRepositoryImpl });
container.register<UserApi>(TYPES.UserApi, { useClass: UserApiImpl });

export { container };