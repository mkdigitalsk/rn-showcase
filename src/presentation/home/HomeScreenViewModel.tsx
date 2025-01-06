import delay from "../../../utils/delay";
import {  useState } from "react";

type HomeState = 
  | { type: 'Loading' } 
  | { type: 'Success'; data: User };

export const HomeViewModel = () => {
    const [state, setState] = useState<HomeState | undefined>(undefined)



    const loadInitialData = async () => {
        setState({type : 'Loading'})
        await delay(2000)
        // const homes = await fetchHomesUseCase(HomeRepository);
        const initialData = USER_MOCK
        console.log(initialData);
        setState({type : 'Success', data : initialData})
        return initialData;
    };

    return {
        state,
        loadInitialData,
    };
};



export type User = {
    id: number
    name: string
}
const USER_MOCK: User = {
    id: 1,
    name: "Miro"
} 