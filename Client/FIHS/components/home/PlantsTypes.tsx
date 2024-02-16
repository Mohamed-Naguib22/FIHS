import React from 'react'
import { View, HStack, VStack, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

export default function PlantsTypes() {
  return (
    
    <VStack justifyContent='space-between' alignItems='center' gap={10}>
        <HStack justifyContent='space-between' alignItems='center' gap={20}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={150} w={150}>
                <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                <Text textAlign='center' color='#000' fontWeight='700' pt={6}>نباتات زهريه</Text>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={150} w={150}>
                <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                <Text textAlign='center' color='#000' fontWeight='700' pt={6}>نباتات زهريه</Text>
            </View>
        </HStack> 
        <HStack justifyContent='space-between' alignItems='center' gap={20}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={150} w={150}>
                <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                <Text textAlign='center' color='#000' fontWeight='700' pt={6}>نباتات زهريه</Text>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={150} w={150}>
                <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                <Text textAlign='center' color='#000' fontWeight='700' pt={6}>نباتات زهريه</Text>
            </View>
        </HStack> 
        <HStack justifyContent='space-between' alignItems='center' gap={20}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={150} w={150}>
                <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                <Text textAlign='center' color='#000' fontWeight='700' pt={6}>نباتات زهريه</Text>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={150} w={150}>
                <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                <Text textAlign='center' color='#000' fontWeight='700' pt={6}>نباتات زهريه</Text>
            </View>
        </HStack> 
    </VStack>
 
    )
}

const styles = StyleSheet.create({
    PlantsTypesImage:{  
        width:"100%",
        height:110,
        borderTopEndRadius:10,
        borderTopStartRadius:10,
    }
  
})