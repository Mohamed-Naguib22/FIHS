import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { Button, ButtonText,View ,Text, HStack, VStack, Input, ImageBackground,} from '@gluestack-ui/themed'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'

type Props = {}

const Register = (props: Props) => {
  const router = useRouter()
  const [isPasswordShown,setIsPasswordShown]=useState(false);
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
     
      <Text textAlign='center' color='$white' fontSize={25} fontWeight='800' pt={30} pb={10}> انشاء  حساب </Text>
     

      <View marginTop={12}>
        {/* <Text fontSize={18} fontWeight='400' color='$white' marginVertical={5} marginRight={22} >الاسم الاول</Text> */}
        <View style={{
        width:"90%",   
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
          padding:4,

        }}
        placeholder='الاسم الاول '
      
        
        
        />

        </View>
      </View>
      <View marginTop={12}>
        {/* <Text fontSize={18} fontWeight='400' color='$white' marginVertical={5} marginRight={22} >الاسم الاول</Text> */}
        <View style={{
        width:"90%",   
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
          padding:4,

        }}
        placeholder='الاسم الثاني '
      
        
        
        />

        </View>
      </View>
      <View marginTop={12}>
        {/* <Text fontSize={18} fontWeight='400' color='$white' marginVertical={5} marginRight={15} >البريد الالكتروني </Text> */}
        <View style={{
        width:"90%",   
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
      <View marginTop={12}>
        {/* <Text fontSize={18} fontWeight='400' color='$white' marginVertical={5} marginRight={12}> كلمه المرور </Text> */}
        <View style={{
          marginRight:12,
          marginLeft:12,
        width:"90%",
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
        {/* <Text marginHorizontal={8} color='#fff' fontSize={12} marginRight={20}>هل نسيت كلمه المرور؟</Text> */}
      </View>
      <HStack 
        justifyContent='center'
        marginVertical={10}
        
        >

      <Button w={130}
      h={"$12"}
        backgroundColor='$white'
          mb={10}
          mt={10}
        borderBottomStartRadius={10}
        borderTopEndRadius={10}
        onPress={()=>router.push('/(auth)/verificationCode/')}>
        <ButtonText color='#000' >انشاء الحساب   </ButtonText>

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
      <Text color='$white' fontSize={14} underline fontWeight='800' textAlign='center'mt={20} onPress={()=>router.push('/(auth)/login')}>
 لدي حساب  بالفعل!</Text>
        
      </View>

     
    </SafeAreaView>
    </ImageBackground>
  )
}

export default Register