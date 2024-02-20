import React from 'react'
import { Stack } from 'expo-router';

type Props = {}

const Authlayout = (props: Props) => {
    return (
        <Stack screenOptions={{
            headerShown:false,
            animation:'slide_from_left',
        }}>
            <Stack.Screen name='login/index'/>
            <Stack.Screen name='register/index'/>
        </Stack>
    )
}

export default Authlayout