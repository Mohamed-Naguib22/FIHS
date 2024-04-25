import React from 'react'
import { View, HStack, VStack, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import TabsPageContainer from "@/components/layout/TabsPageContainer";

export default function AllPlantTypes() {
  const router = useRouter();

    return <><TabsPageContainer>

    <Text textAlign='right' mt={10} mb={10} mx={10} fontWeight='900' fontSize={'$lg'}>انواع النباتات</Text>
        <VStack justifyContent='space-between'  alignItems='center' gap={20}>
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
              
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                    onPress={() => router.push(`/plants/`)}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <HStack justifyContent='center' alignItems='center' m={0}>
                    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                    </HStack>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                    onPress={() => router.push(`/plants/`)}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <HStack justifyContent='center' alignItems='center' m={0}>
                    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                    </HStack>
                </TouchableOpacity>
            </HStack> 
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
              
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                    onPress={() => router.push(`/plants/`)}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <HStack justifyContent='center' alignItems='center' m={0}>
                    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                    </HStack>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                    onPress={() => router.push(`/plants/`)}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <HStack justifyContent='center' alignItems='center' m={0}>
                    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                    </HStack>
                </TouchableOpacity>
            </HStack> 
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
              
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                    onPress={() => router.push(`/plants/`)}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <HStack justifyContent='center' alignItems='center' m={0}>
                    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                    </HStack>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                    onPress={() => router.push(`/plants/`)}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <HStack justifyContent='center' alignItems='center' m={0}>
                    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                    </HStack>
                </TouchableOpacity>
            </HStack> 
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
              
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                    onPress={() => router.push(`/plants/`)}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <HStack justifyContent='center' alignItems='center' m={0}>
                    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                    </HStack>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                    onPress={() => router.push(`/plants/`)}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <HStack justifyContent='center' alignItems='center' m={0}>
                    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                    </HStack>
                </TouchableOpacity>
            </HStack> 
        </VStack>
        </TabsPageContainer>

        </>
    }
    
    const styles = StyleSheet.create({
        PlantsTypesImage:{  
            width:"100%",
            height:140,
            borderTopEndRadius:10,
            borderTopStartRadius:10,
        }
      
    })