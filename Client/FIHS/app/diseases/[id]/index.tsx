import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

type Props = {}

const Disease = (props: Props) => {
    const {id} = useLocalSearchParams()
  return (
    <View>
      <Text>Disease {id}</Text>
    </View>
  )
}

export default Disease