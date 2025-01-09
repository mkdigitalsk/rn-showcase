import delay from "../../../utils/delay";
import { useState } from "react";
import { User } from "../../domain/models/User";
import { GetUserListUseCaseType } from "../../domain/useCases/GetUserListUseCase";
import { RemoveUserUseCaseType } from "../../domain/useCases/RemoveUserUseCase";
import { NativeBridgeSayHelloUseCaseType, NativeBridgeReturnValUseCaseType } from "../../domain/useCases/NativeBridgeUseCase";
import { NativeModules } from "react-native";

type DefaultLoading = {
    type: 'Loading';
};

type HomeSuccessState = {
    type: 'Success';
    data: User[];
};

type HomeState = DefaultLoading | HomeSuccessState;


export const HomeViewModel = (
    getListUseCase: GetUserListUseCaseType,
    removeUserUseCase: RemoveUserUseCaseType,
    sayHellUseCase: NativeBridgeSayHelloUseCaseType,
    returnValUsecase: NativeBridgeReturnValUseCaseType
) => {
    const [state, setState] = useState<HomeState | undefined>(undefined)
    const [nativeText, setNativeText] = useState<string>('initial')


    const loadInitialData = async () => {
        setState({ type: 'Loading' })
        const initialData = await getListUseCase()
        console.log(initialData);
        setState({ type: 'Success', data: initialData })
    };

    const removeUser = async (user: User) => {
        const prevData = (state as HomeSuccessState).data
        setState({ type: 'Loading' })
        await removeUserUseCase(user.id)
        const newData = prevData.filter(item => item.id != user.id)
        setState({ type: 'Success', data: newData })
    };

    const onNativePressed = async () => {
        await sayHellUseCase()
        setNativeText("onNativePressed")
    }

    const withReturnVal = async () => {
        const result = await returnValUsecase()
        console.log(`onNativePressed : ${result}`)
        setNativeText(`withReturnVal: ${result}`)
    }

    return {
        state,
        nativeText,
        loadInitialData,
        removeUser,
        onNativePressed,
        withReturnVal,
    };
};
