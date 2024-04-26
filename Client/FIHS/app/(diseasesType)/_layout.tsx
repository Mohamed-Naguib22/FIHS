import React from 'react'
import { Stack } from 'expo-router';

type Props = {}

const DiseasesPestslayout = (props: Props) => {
    return (
        <Stack screenOptions={{
            headerShown:false,
            animation:'slide_from_right',
        }}>
            <Stack.Screen name='(pests)'/>
             <Stack.Screen name='(diseases)'/>
         </Stack>
    )
}

export default DiseasesPestslayout