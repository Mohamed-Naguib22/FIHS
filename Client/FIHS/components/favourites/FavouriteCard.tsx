import React, { useState } from 'react'
import { HStack, Link, LinkText, VStack, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { FontAwesome } from '@expo/vector-icons'

type Props = {}

const FavouriteCard = (props: Props) => {
    const [isFavourite, setIsFavourite] = useState(true)

    return (
        <HStack gap={"$2"} bg='$rgba(41, 133, 120,0.6)' alignItems='center' borderRadius={"$lg"}>
        <Image
        source={require("@/assets/images/image.jpg")}
        style={{width:100, height:100, objectFit:'cover', borderTopRightRadius:8, borderBottomRightRadius:8}}
        />
        <VStack py={"$1"} gap={"$2"}>
            <Text size='lg' fontWeight='bold' color='$textDark950'>فول</Text>
            <Text size='sm' fontWeight='bold' color='$textDark800'>موعد الري القادم: 5:00 مساءا</Text>
            <Link>
            <LinkText color='$textDark800'>
                مزيد من التفاصيل -{'>'}
            </LinkText>
            </Link>
        </VStack>
        <HStack ml={"auto"} px={"$6"}>
            <VStack bg='$primary800' alignItems='center' justifyContent='center' w={"$10"} h={"$10"} p={"$2"} borderRadius={"$lg"}>
                <Text color='$red500'>
                <FontAwesome size={22} name={`heart${isFavourite?'':'-o'}`} onPress={()=>setIsFavourite(!isFavourite)}/>
                </Text>
            </VStack>
        </HStack>
        </HStack>
    )
}

export default FavouriteCard