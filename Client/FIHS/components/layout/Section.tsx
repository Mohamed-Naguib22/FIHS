import React, { Children } from 'react'
import { HStack, LinkText, ScrollView, Text, View } from '@gluestack-ui/themed'
import { Link } from '@gluestack-ui/themed'
import { useRouter } from 'expo-router';

type Props = {
    name: string,
    link: string, 
    children: React.ReactNode
}

const Section = ({name, children, link}: Props) => {
    const router = useRouter()

  return (
    <View>
        <HStack justifyContent='space-between' alignItems='center' my={"$5"}>
        <Text fontWeight='$bold' size='md'> {name}</Text>
        <Link $active={{opacity:0.75}} onPress={()=>router.push(link as any)} >
            <LinkText backgroundColor='rgba(41, 133, 120,0.6)' padding={5} borderRadius={'$lg'} fontWeight='$bold' size='md' textTransform='none' textDecorationLine='none' color='$white '>المزيد</LinkText>
        </Link>
        </HStack>
        <ScrollView horizontal  contentContainerStyle={{paddingHorizontal:5}} showsHorizontalScrollIndicator={false}>
            {
                children
            }
        </ScrollView>
  </View>
  )
}

export default Section