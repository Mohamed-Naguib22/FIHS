import { HStack, Text, VStack, View } from '@gluestack-ui/themed'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import TabsPageContainer from '@/components/layout/TabsPageContainer';


type Props = {}

const plantTypes = (props: Props) => {
      const router = useRouter()
  return <><TabsPageContainer>
    <View>
        <Text fontWeight='700' fontSize={20} pt={9} pb={15} color='#000'> انواع النباتات</Text>
        <VStack justifyContent='space-between' alignItems='center' gap={20}>
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
                    borderRadius:10,
                    height:180,
                    width:150 ,
                    borderColor:'rgba(41, 133, 120,0.4)',
                    borderWidth:1}}
                    onPress={()=>router.push('/plants/')}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
                    borderRadius:10,
                    height:180,
                    width:150 ,
                    borderColor:'rgba(41, 133, 120,0.4)',
                    borderWidth:1}}
                    onPress={()=>router.push('/plants/')}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                </TouchableOpacity>
            </HStack> 
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
                    borderRadius:10,
                    height:180,
                    width:150 ,
                    borderColor:'rgba(41, 133, 120,0.4)',
                    borderWidth:1}}
                    onPress={()=>router.push('/plants/')}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
                    borderRadius:10,
                    height:180,
                    width:150 ,
                    borderColor:'rgba(41, 133, 120,0.4)',
                    borderWidth:1}}
                    onPress={()=>router.push('/plants/')}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                </TouchableOpacity>
            </HStack> 
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
                    borderRadius:10,
                    height:180,
                    width:150 ,
                    borderColor:'rgba(41, 133, 120,0.4)',
                    borderWidth:1}}
                    onPress={()=>router.push('/plants/')}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
                    borderRadius:10,
                    height:180,
                    width:150 ,
                    borderColor:'rgba(41, 133, 120,0.4)',
                    borderWidth:1}}
                    onPress={()=>router.push('/plants/')}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                </TouchableOpacity>
            </HStack> 
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
                    borderRadius:10,
                    height:180,
                    width:150 ,
                    borderColor:'rgba(41, 133, 120,0.4)',
                    borderWidth:1}}
                    onPress={()=>router.push('/plants/')}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{backgroundColor:"rgba(fff, fff,fff,0.9)",
                    borderRadius:10,
                    height:180,
                    width:150 ,
                    borderColor:'rgba(41, 133, 120,0.4)',
                    borderWidth:1}}
                    onPress={()=>router.push('/plants/')}
                    >
                    <Image style={styles.PlantsTypesImage} source={require('@/assets/images/PlantType.jpg')}/>
                    <Text textAlign='center' color='#298578' marginRight={5} fontWeight='700' pt={6}>نباتات زهريه</Text>
                </TouchableOpacity>
            </HStack> 
           
     

      
    </VStack>
    </View>
  </TabsPageContainer>

    </>
  
}
const styles = StyleSheet.create({
    PlantsTypesImage:{  
        width:"100%",
        height:140,
        borderTopEndRadius:10,
        borderTopStartRadius:10,
    }
  
})

export default plantTypes