import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { Button, ButtonText,View ,Text, HStack, VStack, Input, ImageBackground,} from '@gluestack-ui/themed'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
type Props = {}
const LoginPage = (props: Props) => {
const [isPasswordShown,setIsPasswordShown]=useState(false);
    const router = useRouter()
  return (
    
    <ImageBackground
    style={{
      backgroundColor:"",
      height:"100%",
      width:"100%",
    }}
     source={require("@/assets/images/LoginBG.png")}>
    <SafeAreaView  style={{
      backgroundColor:"rgba(41, 133, 120,0.9)",
      bottom:0,
      left:0,
      right:0,
      position:"absolute",
      height:560,
      borderTopEndRadius:50,
      borderTopStartRadius:50,
      
      }}>
    <View style={{
      flex:1,
      marginHorizontal:15,
    }} >
   
      <Text textAlign='center' color='$white' fontSize={25} fontWeight='800' pt={30} pb={10}>تسجيل الدخول</Text>
      
      <View>
        <Text fontSize={18} fontWeight='400' color='$white' marginVertical={5} marginRight={15} >البريد الالكتروني </Text>
        <View style={{
        width:"92%",   
        marginRight:12,
        marginLeft:12,
        height:48,
        borderColor:"#fff",
        borderWidth:1,
        borderTopEndRadius:10,
        borderBottomStartRadius:10,
        alignItems:"center",
        justifyContent:"center",
        paddingLeft:22,
        backgroundColor:"#fff"

        }}>
        <TextInput
        style={{
          width:"100%",
          textAlign:"right",
          padding:8,

        }}
        placeholder='ادخل البريد الالكتروني '
      
        
        
        />

        </View>
      </View>
      <View marginTop={20}>
        <Text fontSize={18} fontWeight='400' color='$white' marginVertical={5} marginRight={12}> كلمه المرور </Text>
        <View style={{
          marginRight:12,
          marginLeft:12,
        width:"92%",
        height:48,
        borderColor:"#fff",
        borderWidth:1,
        borderTopEndRadius:10,
        borderBottomStartRadius:10,
        alignItems:"center",
        justifyContent:"center",
        paddingLeft:22,
        backgroundColor:"#fff"

        }}>
        <TextInput
        style={{
          width:"100%",
          textAlign:"right",
          padding:8,          
        }}
        secureTextEntry={isPasswordShown}
        placeholder=' ادخل كلمه المرور '
        />
        <TouchableOpacity
        onPress={()=>setIsPasswordShown(!isPasswordShown)}
        style={{
          position:"absolute",
          left:12
        }}>
          {isPasswordShown==true?
          (
            
            <Ionicons name='eye-off' size={24}/>
            ):(
              
              <Ionicons name='eye' size={24}/>
          )
          }
        </TouchableOpacity>
        </View>
        <Text marginHorizontal={8} color='#fff' fontSize={12} marginRight={15} onPress={()=>router.push('/(auth)/resetPassword')}>هل نسيت كلمه المرور؟</Text>
      </View>
      <HStack 
        justifyContent='center'
        marginVertical={10}
        
        >

      <Button w={130}
        h={"$12"}
        backgroundColor='$white'
        mb={20}
        borderBottomStartRadius={10}
        borderTopEndRadius={10}
        onPress={()=>router.push('/(tabs)/home')}>
        <ButtonText color='#000' >تسجيل الدخول </ButtonText>

      </Button>
      </HStack>
        <View style={{
          flexDirection:"row",
          alignItems:"center",
          marginVertical:"2"
        }}>
          <View
          style={{
            flex:1,
            height:1,
            backgroundColor:"#fff",
            marginHorizontal:10,
            
          }}/>
            <Text style={{fontSize:14 ,color:"#fff"}}>او </Text>
            <View
          style={{
            flex:1,
            height:1,
            backgroundColor:"#fff",
            marginHorizontal:10
          }}/>

        </View>
        <HStack justifyContent='center' gap={20}  pt={25} >
          <View bgColor='#fff' borderRadius={15} w={55} h={55} style={{justifyContent:"center",alignItems:"center"}} >
          {/* <Ionicons name='logo-google' color="rgb(41,133,120)"  size={40} /> */}
          <Image style={{width:30,height:30,}} source={require("@/assets/images/google-icon.png")}/>
          </View>
          <View bgColor='#fff' borderRadius={15} w={55} h={55} style={{justifyContent:"center",alignItems:"center"}} >
          <Ionicons name='logo-facebook' color="#0866FF"  size={40} />
          </View>
          
        </HStack>
        <Text textAlign='center' color='#e5e5e5' fontSize={14} fontWeight='800' pt={20}>  إذا لم يكن لديك حساب قم بالتسجيل يمكنك   
      <Text color='$white' fontSize={14} underline fontWeight='800' onPress={()=>router.push('/(auth)/register')}>
     التسجيل هنا!</Text>
      </Text>
        
      </View>

     
    </SafeAreaView>
    </ImageBackground>
  )
}

export default LoginPage