import React from 'react'
import {  HStack, VStack, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from "expo-router";


export default function PlantsTypes() {
  const router = useRouter();

  return (
    
    <VStack justifyContent='space-between' alignItems='center' gap={15}>
    <HStack justifyContent='space-between' alignItems='center' gap={18}>
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
            borderRadius:10,
            height:180,
            width:150 ,
            borderColor:'rgba(41, 133, 120,0.4)',
            borderWidth:1}}
            onPress={()=>router.push('/plants/')}
            >
            <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
            <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
            borderRadius:10,
            height:180,
            width:150 ,
            borderColor:'rgba(41, 133, 120,0.4)',
            borderWidth:1}}
            onPress={()=>router.push('/plants/')}
            >
            <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
            <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
        </TouchableOpacity>
    </HStack> 
    <HStack justifyContent='space-between' alignItems='center' gap={18}>
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
            borderRadius:10,
            height:180,
            width:150 ,
            borderColor:'rgba(41, 133, 120,0.4)',
            borderWidth:1}}
            onPress={()=>router.push('/plants/')}
            >
            <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
            <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
            borderRadius:10,
            height:180,
            width:150 ,
            borderColor:'rgba(41, 133, 120,0.4)',
            borderWidth:1}}
            onPress={()=>router.push('/plants/')}
            >
            <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
            <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
        </TouchableOpacity>
    </HStack> 
    <HStack justifyContent='space-between' alignItems='center' gap={18}>
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
            borderRadius:10,
            height:180,
            width:150 ,
            borderColor:'rgba(41, 133, 120,0.4)',
            borderWidth:1}}
            onPress={()=>router.push('/plants/')}
            >
            <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
            <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
            borderRadius:10,
            height:180,
            width:150 ,
            borderColor:'rgba(41, 133, 120,0.4)',
            borderWidth:1}}
            onPress={()=>router.push('/plants/')}
            >
            <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
            <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
        </TouchableOpacity>
    </HStack> 
    <HStack justifyContent='space-between' alignItems='center' gap={18}>
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
            borderRadius:10,
            height:180,
            width:150 ,
            borderColor:'rgba(41, 133, 120,0.4)',
            borderWidth:1}}
            onPress={()=>router.push('/plants/')}
            >
            <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
            <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
            borderRadius:10,
            height:180,
            width:150 ,
            borderColor:'rgba(41, 133, 120,0.4)',
            borderWidth:1}}
            onPress={()=>router.push('/plants/')}
            >
            <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
            <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
        </TouchableOpacity>
    </HStack> 
   



</VStack>
 
    )
}

const styles = StyleSheet.create({
    PlantsTypesImage:{  
        width:"100%",
        height:140,
        borderTopEndRadius:10,
        borderTopStartRadius:10,
    }
  
})