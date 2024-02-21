import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

type Props = {}

const Article = (props: Props) => {
    const {id} = useLocalSearchParams()
  return (
    <View>
      <Text>Article {id}</Text>
    </View>
  )
}

export default Article