import { HStack, Text, VStack, View } from '@gluestack-ui/themed'
import React from 'react'
import TabsPageContainer from '@/components/layout/TabsPageContainer';
import Section from '@/components/layout/Section';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
export default function PlantDiseases() {
  return (<TabsPageContainer>
    <View>
        {/* <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/> */}
        <Text fontWeight='700' fontSize={20} pt={9}>يتم تقسيم الامراض حسب المرحله</Text>
     <Section name='مرحله الشتلات' link='/'>
            {/* <Text  pt={10}fontWeight='700' fontSize={18}>مرحله الشتلات</Text> */}
        <VStack justifyContent='space-between' alignItems='center' gap={10}>
            <HStack justifyContent='space-between' alignItems='center' gap={20}>
            <View bg='rgba(41, 133, 120,0.4)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.4)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
            <HStack justifyContent='space-between' alignItems='center' gap={20}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
          
        </VStack>   
        </Section> 
     <Section name='مرحله النمو' link='/'>
            {/* <Text  pt={10}fontWeight='700' fontSize={18}>مرحله الشتلات</Text> */}
        <VStack justifyContent='space-between' alignItems='center' gap={10}>
            <HStack justifyContent='space-between' alignItems='center' gap={10}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
            <HStack justifyContent='space-between' alignItems='center' gap={10}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
          
        </VStack>   
        </Section> 
     <Section name='مرحله الازدهار' link='/'>
            {/* <Text  pt={10}fontWeight='700' fontSize={18}>مرحله الشتلات</Text> */}
        <VStack justifyContent='space-between' alignItems='center' gap={10}>
            <HStack justifyContent='space-between' alignItems='center' gap={10}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
            <HStack justifyContent='space-between' alignItems='center' gap={10}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
          
        </VStack>   
        </Section> 
     <Section name='مرحله الاثمار ' link='/'>
            {/* <Text  pt={10}fontWeight='700' fontSize={18}>مرحله الشتلات</Text> */}
        <VStack justifyContent='space-between' alignItems='center' gap={20}>
            <HStack justifyContent='space-between' alignItems='center' gap={20}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
            <HStack justifyContent='space-between' alignItems='center' gap={10}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
          
        </VStack>   
        </Section> 
     <Section name='مرحله الحصاد ' link='/'>
            {/* <Text  pt={10}fontWeight='700' fontSize={18}>مرحله الشتلات</Text> */}
        <VStack justifyContent='space-between' alignItems='center' gap={10}>
            <HStack justifyContent='space-between' alignItems='center' gap={10}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
            <HStack justifyContent='space-between' alignItems='center' gap={10}>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>حشرات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' >المن</Text>
                </VStack>
            </View>
            <View bg='rgba(41, 133, 120,0.6)' borderRadius={"$lg"} borderColor='#000' h={165} w={150}>
                <Image style={styles.plantDiseasesImage} source={require("@/assets/images/PlantDiseases.jpg")}/>
                <VStack justifyContent='center' alignItems='flex-end' pr={6}>

                <Text textAlign='center' color='#000'  pt={6}>الفطريات</Text>
                <Text textAlign='center' color='#000' fontWeight='700' numberOfLines={1}>سقوط البادرات في الشتلات</Text>
                </VStack>
            </View>
            </HStack>
          
        </VStack>   
        </Section> 
    </View>
    </TabsPageContainer>
  )
}

const styles = StyleSheet.create({
    plantDiseasesImage:{
        width:"100%",
        height:100,
        borderTopEndRadius:10,
        borderTopStartRadius:10,
    }
})
