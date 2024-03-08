import React from 'react'
import TabsPageContainer from '@/components/layout/TabsPageContainer'
import { View, HStack, VStack, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Fontisto, FontAwesome} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'



type Props = {}

const Articles = (props: Props) => {
  const router = useRouter()
  return <TabsPageContainer>
      <Text  textAlign='right'  color='#000' fontWeight='900'fontSize={20} p={6}>المقالات </Text>
   <TouchableOpacity onPress={()=>router.push('/articles/[id]')} activeOpacity={1} > 
   <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$xl"} borderColor='#000' mb={15} h={250} w={'$full'}  >
      <Image style={styles.articlePhoto} source={require('@/assets/images/PlantType.jpg')}/>
      <Text  textAlign='right' color='#000' marginRight={5} fontWeight='700' pt={6}> مقاله عن النباتات الزهريه </Text>
      <HStack justifyContent='space-between' alignItems='center'>
        <HStack ml={5} mt={20}  alignItems='center'>
            <Text color='$white' pl={"$2"}>
            <FontAwesome name='thumbs-up' size={20} />
            </Text>
          <Text pt={"$0.5"} px={"$1.5"} color='$white' fontWeight='$bold'  size='xl'>25</Text>
        </HStack>
        
      <HStack justifyContent='flex-end' alignItems='center' gap={9} mt={8} pr={5}>
      <VStack>
        <Text>
          احمد علي 
        </Text>
        <Text>
       1/8/2023
        </Text>
      </VStack>
      <Ionicons name='person-circle-outline' color="#000"  style={{marginTop:6,marginLeft:2}} size={40} />
      </HStack>
      </HStack>

    </View>

   </TouchableOpacity>
   <TouchableOpacity onPress={()=>router.push('/articles/[id]')} activeOpacity={1} > 
   <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$xl"} borderColor='#000' mb={15} h={250} w={'$full'}  >
      <Image style={styles.articlePhoto} source={require('@/assets/images/PlantType.jpg')}/>
      <Text  textAlign='right' color='#000' marginRight={5} fontWeight='700' pt={6}> مقاله عن النباتات الزهريه </Text>
      <HStack justifyContent='space-between' alignItems='center'>
        <HStack ml={5} mt={20}  alignItems='center'>
            <Text color='$black' pl={"$2"}>
            <FontAwesome name='thumbs-up' size={20} />
            </Text>
          <Text pt={"$0.5"} px={"$1.5"} color='$black' fontWeight='$bold'  size='xl'>25</Text>
        </HStack>
        
      <HStack justifyContent='flex-end' alignItems='center' gap={9} mt={8} pr={5}>
      <VStack>
        <Text>
          احمد علي 
        </Text>
        <Text>
       1/8/2023
        </Text>
      </VStack>
      <Ionicons name='person-circle-outline' color="#000"  style={{marginTop:6,marginLeft:2}} size={40} />
      </HStack>
      </HStack>

    </View>

   </TouchableOpacity>
   <TouchableOpacity onPress={()=>router.push('/articles/[id]')} activeOpacity={1} > 
   <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$xl"} borderColor='#000' mb={15} h={250} w={'$full'}  >
      <Image style={styles.articlePhoto} source={require('@/assets/images/PlantType.jpg')}/>
      <Text  textAlign='right' color='#000' marginRight={5} fontWeight='700' pt={6}> مقاله عن النباتات الزهريه </Text>
      <HStack justifyContent='space-between' alignItems='center'>
        <HStack ml={5} mt={20}  alignItems='center'>
            <Text color='$white' pl={"$2"}>
            <FontAwesome name='thumbs-up' size={20} />
            </Text>
          <Text pt={"$0.5"} px={"$1.5"} color='$white' fontWeight='$bold'  size='xl'>25</Text>
        </HStack>
        
      <HStack justifyContent='flex-end' alignItems='center' gap={9} mt={8} pr={5}>
      <VStack>
        <Text>
          احمد علي 
        </Text>
        <Text>
       1/8/2023
        </Text>
      </VStack>
      <Ionicons name='person-circle-outline' color="#000"  style={{marginTop:6,marginLeft:2}} size={40} />
      </HStack>
      </HStack>

    </View>

   </TouchableOpacity>

  </TabsPageContainer>
  
}

export default Articles
const styles = StyleSheet.create({
  articlePhoto:{  
      width:"100%",
      height:160,
      borderTopEndRadius:10,
      borderTopStartRadius:10,
  }

})