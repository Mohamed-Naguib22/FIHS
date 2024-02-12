import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useDerivedValue, withSpring, withTiming } from 'react-native-reanimated'
import { useSharedValue } from 'react-native-reanimated';
import { Button, ButtonText, Fab, HStack, InputField, VStack } from '@gluestack-ui/themed';
import { Input } from '@gluestack-ui/themed';
import { InputSlot } from '@gluestack-ui/themed';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { useTabHeaderHeight } from './useTabHeaderHeight';
import { useNavigation } from 'expo-router';
import { Animated as An } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAnimationState, MotiView } from 'moti'
import Fontisto from '@expo/vector-icons/Fontisto'
const TabsHeader = () => {
  
  const animationState = useAnimationState({
    top: {
      height: 175,
    },
    scrolled: {
      height: 85,
    },
  })
  const {isTop} = useTabHeaderHeight()
  useEffect(()=>{  
    !isTop?animationState.transitionTo('scrolled'):animationState.transitionTo('top')
  },[isTop])
  return (
    <MotiView transition={{type:"spring", damping:50, delay:isTop?150:200}} state={animationState}  style={{ maxHeight:175, paddingTop:0, marginTop:-8}}>
      <StatusBar style={'light'}/>
      <VStack pt={"$2"} h={'$0.5'}>
        <HStack ml={"auto"} px={"$6"} pt={"$10"}>
        <Image
        style={styles.logo}
        source={require('@/assets/images/Logofinal.png')}
        contentFit="cover"
        />
        </HStack>
      </VStack>
      <VStack gap={'$0.5'} position='relative' h={'$full'} maxHeight={175}>    
            <Image
            style={styles.BG}
              source={require('@/assets/images/logoBG.jpg')}
            />
            {
              <MotiView animate={{translateX:isTop?0:500,translateY: 75}} transition={{delay:isTop?500:0, damping:50}} style={{padding:25, backgroundColor:'transparent', zIndex:5}}>
              <Input flexDirection='row-reverse' variant='rounded'>
              <HStack px={'$3'} bg='$white' alignItems='center' justifyContent='space-between' gap={'$1'} w={'$full'}>
                <InputSlot backgroundColor='$white'>
                    <FontAwesome name='search' color={Colors.light.tint} size={18} style={{paddingRight:10}}/>
                </InputSlot>
                  <InputField style={{textAlign:'right'}} backgroundColor='$white' borderColor='$primary500' direction='rtl' placeholder="بحث" />
                <InputSlot backgroundColor='$white'>
                    <Feather name='camera' color={Colors.light.tint} size={18} style={{paddingLeft:10}}/>
                </InputSlot>
              </HStack>
              </Input>
          </MotiView>
            }
            <View style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'rgba(41, 133, 120, 0.15)', zIndex:1}}/>
      </VStack>
    </MotiView>
  )
}

export default TabsHeader

const styles = StyleSheet.create({
  logo: {
    width:100,
    height:35,
    objectFit:"cover",
    zIndex:5

  },
  BG: {
  width:"100%",
  height:"100%",
  top:0,
  left:0,
  position:'absolute',
  objectFit:"cover",
  zIndex:0
},
BG1: {
  width:"100%",
  height:"100%",
  // transform:"translateY(-20px)",

  },
  
});
  