import { useState } from "react";
import { User } from "../../domain/models/User";
import { GetUserListUseCase } from "../../domain/useCases/GetUserListUseCase";
import { RemoveUserUseCase } from "../../domain/useCases/RemoveUserUseCase";
import { NativeBridgeReturnValUseCase, NativeBridgeSayHeloUseCase } from "../../domain/useCases/NativeBridgeUseCase";

export type DefaultLoading = {
    type: 'Loading';
};

type HomeSuccessState = {
    type: 'Success';
    data: User[];
};

type HomeState = DefaultLoading | HomeSuccessState;

export const HomeViewModel = (
    getListUseCase: GetUserListUseCase,
    removeUserUseCase: RemoveUserUseCase,
    sayHelloUseCase: NativeBridgeSayHeloUseCase,
    returnValUsecase: NativeBridgeReturnValUseCase
) => {
    const [state, setState] = useState<HomeState | undefined>(undefined)
    const [nativeText, setNativeText] = useState<string>('initial')


    const loadInitialData = async () => {
        setState({ type: 'Loading' })
        const initialData = await getListUseCase.call()
        setState({ type: 'Success', data: initialData })
    };

    const removeUser = async (user: User) => {
        const prevData = (state as HomeSuccessState).data
        setState({ type: 'Loading' })
        await removeUserUseCase.call(user.id)
        const newData = prevData.filter(item => item.id != user.id)
        setState({ type: 'Success', data: newData })
    };

    const onNativePressed = async () => {
        await sayHelloUseCase.call()
        setNativeText("onNativePressed")
    }

    const withReturnVal = async () => {
        const result = await returnValUsecase.call()
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
