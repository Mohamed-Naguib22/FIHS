import React from 'react'
import { Stack } from 'expo-router';

type Props = {}

const Pestslayout = (props: Props) => {
    return (
        <Stack screenOptions={{
            headerShown:false,
            headerTitle:"hssssscgghg",
            animation:'slide_from_right',
        }}>
            <Stack.Screen name='index'/>
            <Stack.Screen name='[id]/index'/>
        </Stack>
    )
}

export default Pestslayout