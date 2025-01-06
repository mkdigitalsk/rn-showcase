import { Pressable, StyleSheet, Text, View } from "react-native"
import { HomeViewModel } from "./HomeScreenViewModel";
import { useEffect, useState } from "react";
import { User } from "../../domain/models/User";
import { GetUserListUseCase, RemoveUserUseCase } from "../../domain/useCases/GetUserListUseCase";



const HomeScreen = () => {
    const { state, loadInitialData, removeUser } = HomeViewModel(
        GetUserListUseCase,
        RemoveUserUseCase
    );

    useEffect(() => {
        loadInitialData()
    }, [])


    return (<View style={styles.rootContainer}>
        <Text>Home Screen</Text>

        {state?.type === 'Loading' && <Text>Loading ...</Text>}
        {state?.type === 'Success' && <Content userList={state.data} userPressed={removeUser} />}

    </View>)
}

type ContentProps = {
    userList: User[]
    userPressed: (user: User) => void
}

const Content = ({ userList, userPressed }: ContentProps) => {
    return (
        <View>
            {userList.map(element => <UserView user={element} onPress={userPressed} />)}
        </View>
    )
};

type UserViewProp = {
    user: User,
    onPress: (user: User) => void
}
const UserView = ({ user, onPress }: UserViewProp) => {
    return (
        <View style={styles.userContainer}>
            <Pressable
                android_ripple={{ color: 'gray' }}
                onPress={() => onPress(user)}>
                <Text style={styles.userInnerContainer}>{`User: ${user.name}`}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 16,
        overflow: 'hidden'
    },
    userContainer: {
        marginHorizontal: 16,
        borderRadius : 4,
        marginBottom: 8,
        borderWidth: 1
    },
    userInnerContainer : {
        padding: 16,
    }
})

export default HomeScreen

