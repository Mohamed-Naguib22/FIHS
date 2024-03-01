import { HStack, Text } from '@gluestack-ui/themed'
import { View } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import React from 'react'

type Props = {}

const Logo = (props: Props) => {
    return (
        <View>
            <HStack alignItems='center' flexDirection='row-reverse' gap='$1.5'>
                <Image
                style={{width:40, height:40}}
                source={require('@/assets/images/miniLogo.png')}
                />
                <Text pt={'$1.5'} color='$textDark300' fontWeight='$bold' size='lg'>FIHS</Text>
            </HStack>
        </View>
    )
}

export default Logo