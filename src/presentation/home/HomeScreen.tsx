import { Text, View } from "react-native"
import { HomeViewModel, User } from "./HomeScreenViewModel";
import { useEffect, useState } from "react";



const HomeScreen = () => {
    const { state, loadInitialData } = HomeViewModel();

    useEffect(() => {
        loadInitialData()
    }, [])


    return (<View>
        <Text>Home Screen</Text>

        {state?.type === 'Loading' && <Text>Loading ...</Text>}
        {state?.type === 'Success' && <Content user={state.data} />}
        
    </View>)
}

type ContentProps = {
    user: User
}

const Content = ({ user }: ContentProps) => {
    return (<Text>{`User: ${user.name}`}</Text>)
}

export default HomeScreen

