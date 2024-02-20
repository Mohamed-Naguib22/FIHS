import React from 'react'
import { Stack } from 'expo-router';

type Props = {}

const Articleslayout = (props: Props) => {
    return (
        <Stack screenOptions={{
            // headerShown:false,
            animation:'slide_from_right',
        }}>
            <Stack.Screen name='index'/>
            <Stack.Screen name='[id]/index'/>
        </Stack>
    )
}

export default Articleslayout