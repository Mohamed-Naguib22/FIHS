import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { Button, ButtonText,View ,Text, HStack, VStack, Input, ImageBackground,} from '@gluestack-ui/themed'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { OtpInput } from "react-native-otp-entry";
import { useVerify } from '@/hooks/useLogin'


export default function index() {
  <OtpInput 
  numberOfDigits={6}  
  onTextChange={(text) => {console.log(text);setCode(text)}} 
  />
  const [code, setCode] = useState('')
  const verify = useVerify()
  return (
    <ImageBackground
    style={{
      backgroundColor:"",
      height:"100%",
      width:"100%",
    }}
     source={require("@/assets/images/LoginBG.png")}>
    <SafeAreaView  style={{
      backgroundColor:"white",
      top:"20%",
      width:"96%",
      left:0,
      marginLeft:"2%",
      right:0,
      position:"absolute",
      height:250,
      borderRadius:20,
      
      }}>
    <View style={{
      flex:1,
      marginHorizontal:15,
    }} >
      {/* <View
      h={'$1'}
      w={'$24'}
      borderBottomEndRadius={9}
      borderBottomStartRadius={9}
      marginHorizontal="34%"
      bgColor='#fff'
      ></View> */}
      {/* <Image style={{width:150,height:52, backgroundColor:"#fff", left:85,top:10 }} source={require('@/assets/images/Logofinal.png')}/> */}
      <Text textAlign='center' color='$black' fontSize={25} fontWeight='800' pt={30} pb={10}>تأكيد الكود</Text>
     
  <View marginTop={12}>
        <OtpInput
  numberOfDigits={6}
  focusColor="rgba(41, 133, 120,0.9)"
  
  focusStickBlinkingDuration={500}
  onTextChange={(text) => console.log(text)}
  onFilled={(text) => console.log(`OTP is ${text}`)}
  theme={{
    // containerStyle: styles.container,
    // inputsContainerStyle: styles.inputsContainer,
    // pinCodeContainerStyle: styles.pinCodeContainer,
    // pinCodeTextStyle: styles.pinCodeText,
    // focusStickStyle: styles.focusStick,
    // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
  }}
/>
      </View>
 
   
      <VStack 
        justifyContent='center'
        alignItems='center'
        marginVertical={10}  
        >
      <Button w={130}
        h={"$12"}
        backgroundColor='$rgba(41, 133, 120,0.9)'
        mb={10}
        mt={10}
        borderBottomStartRadius={10}
        borderTopEndRadius={10}
        onPress={()=>verify.mutate({verificationCode:code})}>
        <ButtonText color='#fff' >تأكيد</ButtonText>
      </Button>
      <Text>اعادة ارسال رمز التحقق؟</Text>
      </VStack>
      </View>

     
    </SafeAreaView>
  <View w={300} h={300} backgroundColor='rgba(41, 133, 120,0.9)' borderRadius={150} top={450} left={20} zIndex={2} flex={0} justifyContent='center'>
    <Text  padding={20} color='white'>
      سيتم ارسال الكود في رساله عبر الايميل الذي تم التسجيل به 
    </Text>
  </View>
  <View w={150} h={150} backgroundColor='rgba(41, 133, 120,0.9)' borderRadius={100} top={350} left={20} zIndex={1}>

  </View>
  <View w={150} h={150} backgroundColor='rgba(41, 133, 120,0.9)' borderRadius={100} top={0} left={250} zIndex={1}>

  </View>

    </ImageBackground>
  )
}

