import {
  Button,
  ButtonText,
  FormControl,
  HStack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, Modal } from "react-native";
import { Formik } from "formik";
import {
  CropRecommendation,
  CropRecommendationSchema,
} from "@/models/CropRecommendation";
import { useRecommendCrops } from "@/hooks/useRecommendCrops";
import Loading from "@/components/layout/Loading";
import Toast from "react-native-toast-message";
import { err } from "react-native-svg/lib/typescript/xml";

const data = [
  { label: "القاهرة", value: "1" },
  { label: "الجيزة", value: "2" },
  { label: "البحيرة", value: "3" },
  { label: "القليوبية", value: "4" },
  { label: "الإسكندرية", value: "5" },
  { label: "اسوان", value: "6" },
  { label: "الدقهلية", value: "7" },
  { label: "الأقصر", value: "8" },
  { label: "المنوفية", value: "9" },
  { label: "الإسماعيلية", value: "10" },
  { label: "البحر الاحمر", value: "11" },
  { label: "البحيرة", value: "12" },
  { label: "بني سويف", value: "13" },
  { label: "بورسعيد", value: "14" },
  { label: "جنوب سيناء", value: "15" },
  { label: "دمياط", value: "16" },
  { label: "سوهاج", value: "17" },
  { label: "السويس", value: "18" },
  { label: "الشرقية", value: "19" },
  { label: "شمال سيناء", value: "20" },
  { label: "الغربية", value: "21" },
  { label: "قنا", value: "23" },
  { label: "كفر الشيخ", value: "24" },
  { label: "مطروح", value: "25" },
  { label: "المنيا", value: "26" },
  { label: "الوادي الجديد", value: "27" },
  { label: "أسيوط", value: "28" },
];
const data1 = [
  { label: "يناير", value: "1" },
  { label: "فبراير", value: "2" },
  { label: "مارس", value: "3" },
  { label: "ابريل", value: "4" },
  { label: "مايو", value: "5" },
  { label: "يونيو", value: "6" },
  { label: "يوليو", value: "7" },
  { label: "اغسطس", value: "8" },
  { label: "سبتمبر", value: "9" },
  { label: "اكتوبر", value: "10" },
  { label: " نوفمبر", value: "11" },
  { label: "ديسمبر", value: "12" },
];
export default function crop() {
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [crops, setCrops] = useState<Crop[]>([]);
  const recommend = useRecommendCrops();
  return isLoading ? (
    <Loading />
  ) : !crops.length ? (
    <Formik<CropRecommendation>
      initialValues={{
        //@ts-ignore
        N: "",
        //@ts-ignore
        P: "",
        //@ts-ignore
        K: "",
        //@ts-ignore
        ph: "",
        //@ts-ignore
        rainfall: "",
        city: "",
      }}
      onSubmit={(vals) => {
        console.log(vals);
        setIsLoading(true);
        recommend.mutate(vals, {
          onSuccess(data, variables, context) {
            setCrops(data.recommended_crops);
            setIsLoading(false);
            setIsModalVisible(true);
          },
          onError(error, variables, context) {
            setIsLoading(false);
            Toast.show({
              type: "error",
              text1: "حدث خطأ ما",
              text2: error.message,
            });
          },
        });
      }}
      validationSchema={CropRecommendationSchema}
    >
      {({
        setFieldValue,
        handleBlur,
        submitForm,
        values,
        initialValues,
        errors,
      }) => (
        <FormControl>
          <Text
            mt={60}
            mx={20}
            fontWeight='$extrabold'
            textAlign='center'
            size='md'
          >
            اقتراح المحاصيل{" "}
          </Text>
          <VStack mt={50} mx={20} gap={40}>
            <HStack justifyContent='space-between' width='100%'>
              <View width='45%'>
                <Text>كميه النيتروجين</Text>
                <View
                  style={{
                    marginRight: 12,
                    marginLeft: 12,
                    marginTop: 5,
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
                    keyboardType='number-pad'
                    style={{
                      width: "100%",
                      textAlign: "right",
                      padding: 8,
                    }}
                    onChangeText={(e) => {
                      setFieldValue("N", +e);
                    }}
                    onBlur={handleBlur("N")}
                    value={`${values.N}`}
                  />
                </View>
              </View>
              <View width='45%'>
                <Text>كميه الفوسفور</Text>
                <View
                  style={{
                    marginRight: 12,
                    marginLeft: 12,
                    marginTop: 5,
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
                    keyboardType='number-pad'
                    style={{
                      width: "100%",
                      textAlign: "right",
                      padding: 8,
                    }}
                    onChangeText={(e) => {
                      setFieldValue("P", +e);
                    }}
                    onBlur={handleBlur("P")}
                    value={`${values.P}`}
                  />
                </View>
              </View>
            </HStack>
            <HStack justifyContent='space-between' width='100%'>
              <View width='45%'>
                <Text>كميه البوتاسيوم</Text>
                <View
                  style={{
                    marginRight: 12,
                    marginLeft: 12,
                    marginTop: 5,
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
                    keyboardType='number-pad'
                    style={{
                      width: "100%",
                      textAlign: "right",
                      padding: 8,
                    }}
                    onChangeText={(e) => {
                      setFieldValue("K", +e);
                    }}
                    onBlur={handleBlur("K")}
                    value={`${values.K}`}
                  />
                </View>
              </View>
              <View width='45%'>
                <Text>الرقم الهيدروجيني</Text>
                <View
                  style={{
                    marginRight: 12,
                    marginLeft: 12,
                    marginTop: 5,
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
                    keyboardType='number-pad'
                    style={{
                      width: "100%",
                      textAlign: "right",
                      padding: 8,
                    }}
                    onChangeText={(e) => {
                      setFieldValue("ph", +e);
                    }}
                    onBlur={handleBlur("ph")}
                    value={`${values.ph}`}
                  />
                </View>
              </View>
            </HStack>
            <HStack justifyContent='space-between' width='100%'>
              {/* <View width='45%'>
                <Text>   الشهر </Text>
                <View
                  style={{
                    marginRight: 12,
                    marginLeft: 12,
                    marginTop: 5,
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
                    keyboardType='number-pad'
                    placeholder='تقاس بالمليميتر'
                    style={{
                      width: "100%",
                      textAlign: "right",
                      padding: 8,
                    }}
                    onChangeText={(e) => {
                      setFieldValue("rainfall", +e);
                    }}
                    onBlur={handleBlur("rainfall")}
                    value={`${values.rainfall}`}
                  />
                </View>
              </View> */}
              <View width='45%'>
                <Text>الشهر</Text>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data1}
                  search
                  maxHeight={300}
                  labelField='label'
                  valueField='value'
                  placeholder={!isFocus ? "اختار الشهر " : "..."}
                  searchPlaceholder='بحث...'
                  value={data.find((e) => e.label === values.city)}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setFieldValue("city", item.label);
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={isFocus ? "#298578" : "black"}
                      name='calendar'
                      size={20}
                    />
                  )}
                />
              </View>
              <View width='45%'>
                <Text>المدينه</Text>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField='label'
                  valueField='value'
                  placeholder={!isFocus ? "اختار مدينه " : "..."}
                  searchPlaceholder='بحث...'
                  value={data.find((e) => e.label === values.city)}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setFieldValue("city", item.label);
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={isFocus ? "#298578" : "black"}
                      name='home'
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
              onPress={submitForm}
            >
              <ButtonText color='#fff'>اقتراح </ButtonText>
            </Button>
          </HStack>
        </FormControl>
      )}
    </Formik>
  ) : (
    <View mt={200} flex={1}>
      <Modal visible={isModalVisible} animationType='slide'>
        <View
          flex={1}
          backgroundColor='rgba(41, 133, 120,0.6)'
          padding={50}
          borderTopEndRadius={30}
          borderTopStartRadius={30}
        >
          <HStack justifyContent='space-between' alignItems='center'>
            <Button
              mt={20}
              w={60}
              h={"$12"}
              backgroundColor='$white'
              mb={20}
              borderBottomStartRadius={10}
              borderTopEndRadius={10}
              onPress={() => {
                setCrops([]);
                setIsModalVisible(false);
              }}
            >
              <ButtonText color='#000'>X</ButtonText>
            </Button>
            <Text
              textAlign='center'
              fontWeight='$bold'
              size='lg'
              color='$white'
            >
              نتائج الاقتراح
            </Text>
          </HStack>
          <VStack gap={20}>
            {crops.map((crop) => {
              return (
                <View key={crop.crop}>
                  <Text color='$white'>المحصول المقترح :{crop.crop}</Text>
                  <Text color='$white'>نسبه التوقع :{crop.probability}%</Text>
                </View>
              );
            })}
          </VStack>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
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
