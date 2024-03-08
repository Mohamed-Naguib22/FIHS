

import {  StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { HStack, VStack,View, Text } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { Fontisto, FontAwesome} from '@expo/vector-icons' 
import TabsPageContainer from '@/components/layout/TabsPageContainer'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'


type Props = {}

const Pest = (props: Props) => {
  const {id} = useLocalSearchParams()
  return <TabsPageContainer>

  <Image style={styles.articlePhotoId} source={require('@/assets/images/PlantDiseases.jpg')}/>
<VStack>
    {/* <ScrollView horizontal  style={{marginBottom:30}}>
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
  >نبات</Text>
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
  >نبات</Text>
    <Text 
    bg='rgba(41, 133, 120,.3)'
    p={8}
    borderRadius={5}
    textAlign='center'
    fontSize={16}
    fontWeight='600'
  >أمراض</Text>
    <Text 
    bg='rgba(41, 133, 120,.3)'
    p={8}
    borderRadius={5}
    textAlign='center'
    fontSize={16}
    fontWeight='600'
  >افات وحشرات </Text>
  </HStack>
    </ScrollView> */}
    <Text fontSize={20}
    fontWeight='900'
    color='#000'
    mr={9}
    mt={20}
    >
الجراد
    </Text>
    <HStack justifyContent='flex-end' alignItems='center' gap={9} mt={8} pr={5}>
    <Text 
    bg='rgba(41, 133, 120,.3)'
    color='#000'
    p={8}
    borderRadius={5}
    textAlign='center'
    fontSize={16}
    fontWeight='600'>
   النبات
    </Text>
  
    <Text
     fontWeight='800'>
الاسم العلمي للافه</Text>
  </HStack>
  <Text
  fontSize={18}
  fontWeight='900'
  color='#000'
  mt={20}
  mr={3}
  >وصف الافه</Text>
  <Text
  fontSize={16}
  fontWeight='500'
  color='#000'
  mt={10}
  mr={3}>
  تندرج النباتات تحت مملكة النباتات، وهي كائنات متعددة الخلايا، ويُعدّ وجود النباتات مهمّاً جداً في النظام البيئي، حيث يُوجد ما يُقارب 300,000 نوع من النباتات على سطح الكرة الأرضية، بالإضافة إلى أنّها تُعدّ مصدر غذاء لبعض الكائنات الحية، ويُشار إلى أنّ النباتات تحصل على الطاقة اللازمة للنمو والتكاثر عن طريق عملية التمثيل الضوئي.

  </Text>
  <Text
  fontSize={18}
  fontWeight='900'
  color='#000'
  mt={20}
  mr={3}
  > دوره الحيلاه</Text>
  <Text
  fontSize={16}
  fontWeight='500'
  color='#000'
  mt={10}
  mr={3}>
تتميّز النباتات بعدد من الخصائص التي تُميّزها عن غيرها من الكائنات الحية، وهي كالآتي:[٣] تنتمي إلى الكائنات الحية حقيقية النواة، حيث تحتوي نوى خلاياها على (DNA). تقوم بعملية البناء الضوئي، والتي تتمثّل بتحويل الطاقة المُستمدّة من الشمس وغاز ثاني أكسيد الكربون إلى الجلوكوز، وذلك لاحتوائها على البلاستيدات الخضراء التي تقوم بهذه العملية. تُعدّ أجسامها متعددة الخلايا، حيث لا يوجد أيّ نوع من النباتات أُحادي الخلية.

  </Text>
  <Text
  fontSize={18}
  fontWeight='900'
  color='#000'
  mt={20}
  mr={3}
  >طرق الوقايه من المرض</Text>
  <Text
  fontSize={16}
  fontWeight='500'
  color='#000'
  mt={10}
  mr={3}>
تتميّز النباتات بعدد من
  </Text>
  <Text
  fontSize={18}
  fontWeight='900'
  color='#000'
  mt={20}
  mr={3}
  >طرق العلاج </Text>
  <Text
  fontSize={16}
  fontWeight='500'
  color='#000'
  mt={10}
  mr={9}>
تتميّز النباتات بعدد من الخصائص التي تُميّزها عن غيرها من الكائنات الحية، وهي كالآتي:[٣] تنتمي إلى الكائنات الحية حقيقية النواة، حيث تحتوي نوى خلاياها على (DNA). تقوم بعملية البناء الضوئي، والتي تتمثّل بتحويل الطاقة المُستمدّة من الشمس وغاز ثاني أكسيد الكربون إلى الجلوكوز، وذلك لاحتوائها على البلاستيدات الخضراء التي تقوم بهذه العملية. تُعدّ أجسامها متعددة الخلايا، حيث لا يوجد أيّ نوع من النباتات أُحادي الخلية.

  </Text>

  
  <Text
  fontSize={18}
  fontWeight='900'
  color='#000'
  mt={20}
  mr={3}
  > النباتات التي يمكن ان تصاب بنفس المرض</Text>

<ScrollView horizontal style={{marginBottom:30}} >

<TouchableOpacity activeOpacity={1} style={{backgroundColor:"transparent",borderColor:"rgba(41, 133, 120,0.6)",borderWidth:1,borderRadius:5,height:150,width:150,marginRight:10}} bg='' borderRadius={"$lg"} borderColor='#000' h={150} w={150} marginRight={10}>
    <Image style={styles.similar} source={require('@/assets/images/PlantType.jpg')}/>
    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
</TouchableOpacity>
<TouchableOpacity activeOpacity={1} style={{backgroundColor:"transparent",borderColor:"rgba(41, 133, 120,0.6)",borderWidth:1,borderRadius:5,height:150,width:150,marginRight:10}} bg='' borderRadius={"$lg"} borderColor='#000' h={150} w={150} marginRight={10}>
    <Image style={styles.similar} source={require('@/assets/images/PlantType.jpg')}/>
    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
</TouchableOpacity>
<TouchableOpacity activeOpacity={1} style={{backgroundColor:"transparent",borderColor:"rgba(41, 133, 120,0.6)",borderWidth:1,borderRadius:5,height:150,width:150,marginRight:10}} bg='' borderRadius={"$lg"} borderColor='#000' h={150} w={150} marginRight={10}>
    <Image style={styles.similar} source={require('@/assets/images/PlantType.jpg')}/>
    <Text textAlign='center' color='#000' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
</TouchableOpacity>
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
similar:{  
width:"100%",
height:110,
borderTopEndRadius:5,
borderTopStartRadius:5,
}
})

export default Pest