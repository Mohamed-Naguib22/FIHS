import {  StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { HStack, VStack,View, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { ScrollView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { Fontisto, FontAwesome} from '@expo/vector-icons' 
import TabsPageContainer from '@/components/layout/TabsPageContainer'
import { InboxIcon } from 'lucide-react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
type Props = {}

const Plant = (props: Props) => {
    const {id} = useLocalSearchParams()
    const router = useRouter();

  return <TabsPageContainer>

      <Image style={styles.articlePhotoId} source={require('@/assets/images/PlantDiseases.jpg')}/>
    <VStack>
        <ScrollView horizontal  style={{marginBottom:30}}>
      <HStack justifyContent='flex-end' gap={10} mt={10} mr={5} ml={5}>
        <Text 
        bg='rgba(41, 133, 120,.3)'
        p={8}
        borderRadius={5}
        textAlign='center'
        fontSize={16}
        fontWeight='600'
      >نبات</Text>
        <Text 
        bg='rgba(41, 133, 120,.3)'
        p={8}
        borderRadius={5}
        textAlign='center'
        fontSize={16}
        fontWeight='600'
      >بقوليات</Text>
        <Text 
        bg='rgba(41, 133, 120,.3)'
        p={8}
        borderRadius={5}
        textAlign='center'
        fontSize={16}
        fontWeight='600'
      >غذاء</Text>
      
      </HStack>
        </ScrollView>
        <Text fontSize={20}
        fontWeight='900'
        color='#000'
        mr={9}
        >
الفول 
        </Text>
        <VStack>

      <Text
      fontSize={18}
      fontWeight='900'
      color='#000'
      mt={20}
      mr={9}
      >وصف النبات</Text>
      <Text
      fontSize={16}
      fontWeight='500'
      color='#000'
      mt={10}
      mr={9}>
      تندرج النباتات تحت مملكة النباتات، وهي كائنات متعددة الخلايا، ويُعدّ وجود النباتات مهمّاً جداً في النظام البيئي، حيث يُوجد ما يُقارب 300,000 نوع من النباتات على سطح الكرة الأرضية، بالإضافة إلى أنّها تُعدّ مصدر غذاء لبعض الكائنات الحية، ويُشار إلى أنّ النباتات تحصل على الطاقة اللازمة للنمو والتكاثر عن طريق عملية التمثيل الضوئي.

      </Text>
        </VStack>
        <HStack justifyContent='space-evenly' alignItems='center' gap={9} mt={8} pr={5}>
          <VStack justifyContent='center' alignItems='center'>
            <View w={40} h={40} borderRadius={5} justifyContent='center' alignItems='center' bg='$rgba(41, 133, 120,0.6)'>

            <Ionicons name="sunny-outline" size={25}/>
            </View>

            
            <Text>الضوء</Text>
            <Text>متوسط</Text>
          </VStack>
          <VStack justifyContent='center' alignItems='center'>
            <View w={40} h={40} borderRadius={5} justifyContent='center' alignItems='center' bg='$rgba(41, 133, 120,0.6)'>

            <Ionicons name="thermometer-outline" size={25}/>
            </View>

            
            <Text>الجراره</Text>
            <Text>18c</Text>
          </VStack>
          <VStack justifyContent='center' alignItems='center'>
            <View w={40} h={40} borderRadius={5} justifyContent='center' alignItems='center' bg='$rgba(41, 133, 120,0.6)'>

            <Ionicons name="water-outline" size={25}/>
            </View>

            
            <Text>الماء</Text>
            <Text>شديد</Text>
          </VStack>
          <VStack justifyContent='center' alignItems='center'>
            <View w={40} h={40} borderRadius={5} justifyContent='center' alignItems='center' bg='$rgba(41, 133, 120,0.6)'>

            <Ionicons name="color-palette-outline" size={25}/>
            </View>

            
            <Text>اللون </Text>
            <Text>بني</Text>
          </VStack>
        </HStack>
        <VStack>

<Text
fontSize={18}
fontWeight='900'
color='#000'
mt={20}
mr={9}
> مواسم الزراعه والحصاد</Text>
<Text
fontSize={16}
fontWeight='500'
color='#000'
mt={10}
mr={9}>
يتم الزراعه في شهر فبراير والحصاد في مايو 
</Text>
  </VStack>
   <VStack>

<Text
fontSize={18}
fontWeight='900'
color='#000'
mt={20}
mr={9}
> الاسمده</Text>
<Text
fontSize={16}
fontWeight='500'
color='#000'
mt={10}
mr={9}>
سماد عضوي
</Text>
  </VStack>
   <VStack>

<Text
fontSize={18}
fontWeight='900'
color='#000'
mt={20}
mr={9}
> نوع التربه </Text>
<Text
fontSize={16}
fontWeight='500'
color='#000'
mt={10}
mr={9}>
طينيه
</Text>
  </VStack>
   <VStack>

<Text
fontSize={18}
fontWeight='900'
color='#000'
mt={20}
mr={9}
> طريقه الري</Text>
<Text
fontSize={16}
fontWeight='500'
color='#000'
mt={10}
mr={9}>
بالتنقيط
</Text>
  </VStack>
   <VStack>

<Text
fontSize={18}
fontWeight='900'
color='#000'
mt={20}
mr={9}
> القيمه الغذائيه</Text>
<Text
fontSize={16}
fontWeight='500'
color='#000'
mt={10}
mr={9}>
يحتوي علي فيتامين c
</Text>
  </VStack>
   <VStack>

<Text
fontSize={18}
fontWeight='900'
color='#000'
mt={20}
mr={9}
>  الاستخدامات</Text>
<Text
fontSize={16}
fontWeight='500'
color='#000'
mt={10}
mr={9}>
طعام </Text>
  </VStack>
    
      
      <Text
      fontSize={18}
      fontWeight='900'
      color='#000'
      mt={20}
      mr={9}
      > مقالات مشابهه</Text>

      <ScrollView horizontal style={{marginBottom:30}} >

      <HStack justifyContent='space-between' alignItems='center' gap={18}>
              
              <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                  onPress={() => router.push(`/plants/[id]`)}
                  >
                  <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                  <HStack justifyContent='center' alignItems='center' m={0}>
                  <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                  </HStack>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                  onPress={() => router.push(`/plants/[id]`)}
                  >
                  <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                  <HStack justifyContent='center' alignItems='center' m={0}>
                  <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                  </HStack>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                  onPress={() => router.push(`/plants/[id]`)}
                  >
                  <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                  <HStack justifyContent='center' alignItems='center' m={0}>
                  <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                  </HStack>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgb(255, 255,255)",borderRadius:10,borderWidth:1, borderColor:'rgb(41, 133, 120)', height:180, width:150}}
                  onPress={() => router.push(`/plants/[id]`)}
                  >
                  <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                  <HStack justifyContent='center' alignItems='center' m={0}>
                  <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                  </HStack>
              </TouchableOpacity>
          </HStack> 
      </ScrollView>
    </VStack>
  </TabsPageContainer>
  
}
const styles = StyleSheet.create({
  articlePhotoId:{  
      width:"100%",
      height:200,
      // borderTopEndRadius:10,
      // borderTopStartRadius:10,
      borderRadius:10,
  },
  similarArticles:{  
    width:"100%",
    height:110,
    borderTopEndRadius:10,
    borderTopStartRadius:10,
  },
  PlantsTypesImage:{  
      width:"100%",
      height:140,
      borderTopEndRadius:10,
      borderTopStartRadius:10,
  }

})
export default Plant