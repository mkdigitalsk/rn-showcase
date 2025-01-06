import delay from "../../../utils/delay";
import { useState } from "react";
import { User } from "../../domain/models/User";
import { GetUserListUseCaseType, RemoveUserUseCaseType } from "../../domain/useCases/GetUserListUseCase";

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
    removeUserUseCase: RemoveUserUseCaseType
) => {
    const [state, setState] = useState<HomeState | undefined>(undefined)


    const loadInitialData = async () => {
        setState({ type: 'Loading' })
        // const homes = await fetchHomesUseCase(HomeRepository);
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

    return {
        state,
        loadInitialData,
        removeUser
    };
};
