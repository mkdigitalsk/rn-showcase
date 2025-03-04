import { useState } from "react";
import { User } from "../../domain/models/User";
import { DefaultLoading } from "../home/HomeViewModel"
import { GetDetailsUseCase } from "../../domain/useCases/GetDetailsUseCase";



type DetailsSuccessState = {
    type: 'Success';
    data: User,
}
type DetailsState = DefaultLoading | DetailsSuccessState

export const DetailsViewModel = (
    getDetailsUseCase: GetDetailsUseCase
) => {
    const [state, setState] = useState<DetailsState>({type: 'Loading'})

    const loadInitialData = async (id: number) => {
        const user = await getDetailsUseCase.call(id)
        setState({ type: 'Success', data: user})
    }

};