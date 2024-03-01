import {ActivityIndicator } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, View } from '@gluestack-ui/themed'
import Logo from './Logo'

type Props = {}

const Loading = (props: Props) => {
  return (
    <View flex={1} alignItems='center' justifyContent='center'>
        <StatusBar style='light'/>
        <ImageBackground
        style={{
        backgroundColor:"",
        height:"100%",
        width:"100%",
        }}
        source={require("@/assets/images/LoginBG.png")}
        />
        <View position='absolute' zIndex={999} top={40}>
            <Logo/>
        </View>
        <View position='absolute' w={'$full'} h={'$full'} backgroundColor='rgba(0, 0, 0, 0.75)'/>
        <ActivityIndicator style={{zIndex:999, position:'absolute'}} color={'#298578'} size={'large'}/>
        <Text position='absolute' top={'$1/2'} mt={'$7'} color='$textDark300'>جاري التحميل...</Text>
    </View>
  )
}

export default Loading