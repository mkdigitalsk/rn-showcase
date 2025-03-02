import { NativeModules } from "react-native";
import { injectable } from "tsyringe";


const { MyCustomModule } = NativeModules;

@injectable()
export class NativeBridgeSayHeloUseCase {
    async call() {
        MyCustomModule.sayHello('React Native!')
            .then(() => {
                console.log('Message sent to native module');
            })
            .catch((error: Error) => {
                console.error('Error from native module:', error.message);
            });
    }
}

@injectable()
export class NativeBridgeReturnValUseCase {
    async call() {
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
}
