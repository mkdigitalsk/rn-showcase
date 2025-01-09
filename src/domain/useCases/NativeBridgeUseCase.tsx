import { NativeModules } from "react-native";


const { MyCustomModule } = NativeModules;

export type NativeBridgeSayHelloUseCaseType = () => Promise<void>
export const NativeBridgeSayHeloUseCase: NativeBridgeSayHelloUseCaseType = async () => {
    MyCustomModule.sayHello('React Native!')
        .then(() => {
            console.log('Message sent to native module');
        })
        .catch((error: Error) => {
            console.error('Error from native module:', error.message);
        });
}

export type NativeBridgeReturnValUseCaseType = () => Promise<number>
export const NativeBridgeReturnValUseCase: NativeBridgeReturnValUseCaseType = async () => {
    return MyCustomModule.returnValueTest(4)
        .then((result: number) => {
            console.log(`NativeBridgeReturnValUseCase Success : ${result}`);
            return result;
        })
        .catch((error: Error) => {
            console.error('Error from native module:', error.message);
            throw error;
        });
}

// const provideGetUserListUseCase = () => GetUserListUseCase(provideUserRepository())
