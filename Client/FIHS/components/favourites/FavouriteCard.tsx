import React, { useState } from 'react'
import { HStack, Link, LinkText, VStack, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
type Props = {}

const FavouriteCard = (props: Props) => {
    const [isFavourite, setIsFavourite] = useState(true)
    const router = useRouter();


    return (
        <HStack gap={"$2"} bg='#fff'alignItems='center' borderRadius={"$lg"}borderWidth={1} borderColor='$rgb(41, 133, 120)'>
        <HStack mr={0} px={"$2"}>
            <VStack bg='$#fff' borderWidth={1} borderColor='$rgb(41, 133, 120)' alignItems='center'  justifyContent='center' w={"$10"} h={"$10"} p={"$2"} borderRadius={"$lg"}>
                <Text color='$red600'>
                <FontAwesome size={22} name={`heart${isFavourite?'':'-o'}`} onPress={()=>setIsFavourite(!isFavourite)}/>
                </Text>
            </VStack>
        </HStack>
        <VStack py={"$1"} gap={"$2"}>
            <Text size='lg' fontWeight='bold' color='$textDark950'>فول</Text>
            <Text size='sm' fontWeight='bold' color='$textDark800'>موعد الري القادم: 5:00 مساءا</Text>
            
            <TouchableOpacity activeOpacity={1} 
                    onPress={() => router.push(`/plants/[id]`)}
                    >
                <Text color='$textDark800' 
                >

                مزيد من التفاصيل -{'>'}
                </Text>
            </TouchableOpacity>
            
        </VStack>
        <Image
        source={require("@/assets/images/image.jpg")}
        style={{width:100, height:100, objectFit:'cover', borderTopRightRadius:7, borderBottomRightRadius:7,marginLeft:-1}}
        />
        </HStack>
    )
}

export default FavouriteCard