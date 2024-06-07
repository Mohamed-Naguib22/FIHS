import {
  Button,
  ButtonText,
  FormControl,
  HStack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, Modal } from "react-native";
import { Formik } from "formik";
import {
  CropRecommendation,
  CropRecommendationSchema,
} from "@/models/CropRecommendation";
import {
  useCities,
  useMonths,
  useRecommendCrops,
} from "@/hooks/useRecommendCrops";
import Loading from "@/components/layout/Loading";
import Toast from "react-native-toast-message";

export default function crop() {
  const [isMFocus, setIsMFocus] = useState(false);
  const [isCFocus, setIsCFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allCities, setAllCities] = useState<
    { label: string; value: string }[]
  >([]);
  const [allMonths, setAllMonths] = useState<
    { label: string; value: string }[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [crops, setCrops] = useState<Crop[]>([]);
  const recommend = useRecommendCrops();
  const { data: cities, isLoading: isCitiesLoading } = useCities();
  const { data: months, isLoading: isMonthsLoading } = useMonths();
  const addedCities = cities?.map((city, val) => {
    return { label: city, value: city };
  });
  const addedMonths = months?.map((month, val) => {
    return { label: month, value: month };
  });
  useEffect(() => {
    setAllCities(addedCities || []);
  }, [isCitiesLoading]);
  useEffect(() => {
    setAllMonths(addedMonths || []);
  }, [isMonthsLoading]);

  return isLoading || isCitiesLoading || isMonthsLoading ? (
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
        month: "",
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
              <View width='45%'>
                <Text>الشهر</Text>
                <Dropdown
                  style={[styles.dropdown, isMFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={allMonths}
                  search
                  maxHeight={300}
                  labelField={"label"}
                  valueField={"value"}
                  placeholder={!isMFocus ? "اختار الشهر " : "..."}
                  searchPlaceholder='بحث...'
                  value={allMonths?.find((e) => e.label === values.month)}
                  onFocus={() => setIsMFocus(true)}
                  onBlur={() => setIsMFocus(false)}
                  onChange={(item) => {
                    setFieldValue("month", item.label);
                    setIsMFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={isMFocus ? "#298578" : "black"}
                      name='calendar'
                      size={20}
                    />
                  )}
                />
              </View>
              <View width='45%'>
                <Text>المدينه</Text>
                <Dropdown
                  style={[styles.dropdown, isCFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={allCities}
                  search
                  maxHeight={300}
                  labelField={"label"}
                  valueField={"value"}
                  placeholder={!isCFocus ? "اختار مدينه " : "..."}
                  searchPlaceholder='بحث...'
                  value={allCities?.find((e) => e.label === values.city)}
                  onFocus={() => setIsCFocus(true)}
                  onBlur={() => setIsCFocus(false)}
                  onChange={(item) => {
                    setFieldValue("city", item.label);
                    setIsCFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={isCFocus ? "#298578" : "black"}
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
            {crops.map(({ crop, probability }, i) => {
              return (
                <View key={crop}>
                  <Text color='$white'>المحصول المقترح :{crop}</Text>
                  <Text color='$white'>نسبه التوقع :{probability}%</Text>
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
