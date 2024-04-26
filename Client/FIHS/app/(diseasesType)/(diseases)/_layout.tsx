import React from 'react'
import { Stack } from 'expo-router';

type Props = {}

const Diseaseslayout = (props: Props) => {
    return (
        <Stack screenOptions={{
            headerShown:false,
            headerTitle:"hcgghg",
            animation:'slide_from_right',
        }}>
            <Stack.Screen name='index'/>
            <Stack.Screen name='[id]/index'/>
        </Stack>
    )
}

export default Diseaseslayout