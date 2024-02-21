import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Button, ButtonText } from '@gluestack-ui/themed'

type Props = {}

const LoginPage = (props: Props) => {
    const router = useRouter()
  return (
    <View>
      <Text>تسجيل الدخول</Text>
      <Button onPress={()=>router.push('/(auth)/register')}>
        <ButtonText>تسجيل</ButtonText>
      </Button>
    </View>
  )
}

export default LoginPage