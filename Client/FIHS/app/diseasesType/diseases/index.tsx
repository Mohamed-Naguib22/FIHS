import { HStack, Text, VStack, View } from '@gluestack-ui/themed'
import React from 'react'
import TabsPageContainer from '@/components/layout/TabsPageContainer';
import Section from '@/components/layout/Section';

import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'

export default function Diseases() {
    const router = useRouter()

      return (<TabsPageContainer>
    <View>
        {/* <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/> */}
        <Text fontWeight='700' fontSize={20} pt={9} pb={15} color='#000'> الأمراض</Text>
     {/* <Section name='الامراض' link='/'> */}
            {/* <Text  pt={10}fontWeight='700' fontSize={18}>مرحله الشتلات</Text> */}
        <VStack justifyContent='space-between' alignItems='center' gap={10}>
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",borderRadius:10,height:165,width:150 ,borderColor:'rgba(41, 133, 120,0.4)', borderWidth:1}} onPress={()=>router.push('/diseasesType/diseases/[id]')}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",borderRadius:10,height:165,width:150 ,borderColor:'rgba(41, 133, 120,0.4)', borderWidth:1}}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </TouchableOpacity>
      
      
            </HStack>
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",borderRadius:10,height:165,width:150 ,borderColor:'rgba(41, 133, 120,0.4)', borderWidth:1}} >
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",borderRadius:10,height:165,width:150 ,borderColor:'rgba(41, 133, 120,0.4)', borderWidth:1}}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </TouchableOpacity>

      
            </HStack>
       
          
        </VStack>   
        {/* </Section>  */}

     

   
    </View>
    </TabsPageContainer>
  )
}

const styles = StyleSheet.create({
  plantDiseasesImage:{  
      width:"100%",
      height:110,
      borderTopEndRadius:10,
      borderTopStartRadius:10,
  }

})