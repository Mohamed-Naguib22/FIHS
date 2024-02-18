import React, { useEffect } from 'react'
import { HStack, LinkText, ScrollView, Text, View } from '@gluestack-ui/themed'
import { Link } from '@gluestack-ui/themed'
import useTabsHeaderName from '@/hooks/state/useTabsHeaderName'

type Props = {
    name: string, 
    children: React.ReactNode
}

const ScreenHeader = ({name, children}: Props) => {
    const {setName} = useTabsHeaderName()
    useEffect(()=>{
        setName(name)
    },[name])
  return (
    <View>
        <HStack justifyContent='space-between' alignItems='center' my={"$3"}>
        <Text fontWeight='$bold' size='2xl'> {name}</Text>
        </HStack>
        <ScrollView>
            {
                children
            }
        </ScrollView>
  </View>
  )
}

export default ScreenHeader