import { Button, ButtonText, FormControl, HStack, Text,VStack,View } from "@gluestack-ui/themed";
import React, { useState } from 'react';
import TabsPageContainer from '@/components/layout/TabsPageContainer'
import { TextInput } from "react-native-gesture-handler";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet,Modal} from 'react-native';
import { Colors } from '@/constants/Colors';


const data = [
  { label: 'القاهره', value: '1' },
  { label: 'الجيزه', value: '2' },
  { label: 'البحيره', value: '3' },
  { label: 'القليوبيه', value: '4' },
  { label: 'الاسنكدريه', value: '5' },
  { label: 'اسوان', value: '6' },
  { label: 'الدقهليه', value: '7' },
  { label: 'الاقصر', value: '8' },
  { label: 'المنوفيه', value: '9' },
  { label: 'الاسماعيليه', value: '10' },
  { label: 'البحر الاحمر', value: '11' },
  { label: 'البحيره', value: '12' },
  { label: 'بني سويف', value: '13' },
  { label: 'بورسعيد', value: '14' },
  { label: 'جنوب سيناء', value: '15' },
  { label: 'دمياط', value: '16' },
  { label: 'سوهاج', value: '17' },
  { label: 'السويس', value: '18' },
  { label: 'الشرقيه', value: '19' },
  { label: 'شمال سيناء', value: '20' },
  { label: 'الغربيه', value: '21' },
  { label: 'قنا', value: '23' },
  { label: 'كفر الشيخ', value: '24' },
  { label: 'مطروح', value: '25' },
  { label: 'المنيا', value: '26' },
  { label: 'الوادي الجديد', value: '27' },
  { label: 'اسيوط', value: '28' },
];
export default function crop() {
  const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };
  return<>
    <FormControl>
      
    <Text mt={60} mx={20} fontWeight='$bold' textAlign="center" size='md'>اقتراح المحاصيل </Text>
   <VStack mt={50} mx={20} gap={40}>
    <HStack justifyContent="space-between" width='100%'>
      <View  width='45%'>
        <Text>
          كميه النيتروجين 
        </Text>
        <View
          style={{
            marginRight: 12,
            marginLeft: 12,
            marginTop:5,
            width: "90%",
            height: 48,
            borderColor: "#298578",
            borderStartWidth: 1,
            borderBottomWidth: 1,
            borderTopEndRadius: 10,
            borderBottomStartRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
          keyboardType="number-pad"
            style={{
              width: "100%",
              textAlign: "right",
              padding: 8,
            }}
          />
        </View>

      </View>
      <View  width="45%">
        <Text>
          كميه الفوسفور 
        </Text>
        <View
          style={{
            marginRight: 12,
            marginLeft: 12,
            marginTop:5,
            width: "90%",
            height: 48,
            borderColor: "#298578",
            borderStartWidth: 1,
            borderBottomWidth: 1,
            borderTopEndRadius: 10,
            borderBottomStartRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
          keyboardType="number-pad"
            style={{
              width: "100%",
              textAlign: "right",
              padding: 8,
            }}
          />
        </View>

      </View>
    </HStack>
    <HStack justifyContent="space-between" width='100%'>
      <View  width='45%'>
        <Text>
          كميه البوتاسيوم 
        </Text>
        <View
          style={{
            marginRight: 12,
            marginLeft: 12,
            marginTop:5,
            width: "90%",
            height: 48,
            borderColor: "#298578",
            borderStartWidth: 1,
            borderBottomWidth: 1,
            borderTopEndRadius: 10,
            borderBottomStartRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
            backgroundColor: "#fff",          }}
        >
          <TextInput
          keyboardType="number-pad"
            style={{
              width: "100%",
              textAlign: "right",
              padding: 8,
            }}
          />
        </View>

      </View>
      <View  width="45%">
        <Text>
          الرقم الهيدروجيني  
       </Text>
        <View
          style={{
            marginRight: 12,
            marginLeft: 12,
            marginTop:5,
            width: "90%",
            height: 48,
            borderColor: "#298578",
            borderStartWidth: 1,
            borderBottomWidth: 1,
            borderTopEndRadius: 10,
            borderBottomStartRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
          keyboardType="number-pad"
            style={{
              width: "100%",
              textAlign: "right",
              padding: 8,
            }}
          />
        </View>

      </View>
    </HStack>
    <HStack justifyContent="space-between" width='100%'>
      <View  width='45%'>
        <Text>
          عمق المياه داخل التربه
        </Text>
        <View
          style={{
            marginRight: 12,
            marginLeft: 12,
            marginTop:5,
            width: "90%",
            height: 48,
            borderColor: "#298578",
            borderStartWidth: 1,
            borderBottomWidth: 1,
            borderTopEndRadius: 10,
            borderBottomStartRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
          keyboardType="number-pad"
          placeholder="تقاس بالمليميتر"
            style={{
              width: "100%",
              textAlign: "right",
              padding: 8,
            }}
          />
        </View>

      </View>
      <View  width="45%">
        <Text>
              المدينه
        </Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'اختار مدينه ' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? '#298578' : 'black'}
              name="home"
              size={20}
              />
            )}
        />

      </View>
    </HStack>


   </VStack>
   <HStack justifyContent='center' marginVertical={10} mt={20}>
                    <Button
                      w={130}
                      h={"$12"}
                      backgroundColor='rgba(41, 133, 120,0.6)'
                      mb={20}
                      mt={50}
                      borderBottomStartRadius={10}
                      borderTopEndRadius={10}
                      onPress={()=>setIsModalVisible(true)}
                    >
                      <ButtonText color='#fff'>اقتراح </ButtonText>
                    </Button>
                  </HStack>
                  <View mt={200}>
                  <Modal
                  visible={isModalVisible}
                  animationType="slide"
                  >
                    <View flex={1} backgroundColor="rgba(41, 133, 120,0.6)" padding={50} borderTopEndRadius={30} borderTopStartRadius={30}>
                    <HStack justifyContent="space-between" alignItems="center">
                      <Button
                      mt={20}
                      w={60}
                      h={"$12"}
                      backgroundColor='$white'
                      mb={20}
                      borderBottomStartRadius={10}
                      borderTopEndRadius={10}
                      onPress={()=>setIsModalVisible(false)}
                    >

                      <ButtonText color='#000'>X</ButtonText>
                    </Button>
                      <Text textAlign="center" fontWeight='$bold' size='lg' color="$white">نتائج الاقتراح</Text>
                    </HStack>
                    <VStack gap={20}>

                      <View>


                      <Text color="$white">المصحول الاول هو :القمح</Text>
                      <Text color="$white">نسبه التوقع :60%</Text>
                      </View>
                      <View>


                      <Text color="$white">المصحول الاول هو :القمح</Text>
                      <Text color="$white">نسبه التوقع :60%</Text>
                      </View>
                      <View>


                      <Text color="$white">المصحول الاول هو :القمح</Text>
                      <Text color="$white">نسبه التوقع :60%</Text>
                      </View>
                    </VStack>
                    </View>
                  </Modal>
                  </View>

    </FormControl>

  </>
   
}
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
