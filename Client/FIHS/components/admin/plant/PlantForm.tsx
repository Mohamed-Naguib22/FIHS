import { ButtonSpinner, ScrollView, VStack, View } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { FormControl } from "@gluestack-ui/themed";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormInput from "../FormInput";
import * as Yup from "yup";
import { PostPlant, TPostPlantForm, useSoils } from "@/hooks/usePlant";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const PlantForm = () => {
  const { id } = useLocalSearchParams();
  const navigate = useNavigation();
  const router = useRouter();
  const postPlant = PostPlant();
  const { data: soils } = useSoils();
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    navigate.setOptions({
      title: "نبات جديد",
    });
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView flex={1}>
      <Formik<TPostPlantForm>
        initialValues={{
          Name: "",
          Description: "",
          CommonUses: "",
          AverageYield: 0,
          CulivationTips: "",
          HarvistingSeason: "",
          IrrigationReqs: 0,
          NutritionalValue: "",
          PlantingSeason: "",
          SunlightReqs: "",
          Temperature: "",
          SoilsId: "",
          Color: "",
          ScientificName: "",
          PlantTypesId: id as string,
          //@ts-ignore
          ImgFile: undefined,
        }}
        onSubmit={(vals, { resetForm }) => {
          console.log(vals);
          setIsLoading(true);
          postPlant.mutate(vals, {
            onSuccess(data, variables, context) {
              resetForm();
              router.push(`/(admin)/plantTypes/${id}`);
            },
          });
          setIsLoading(false);
        }}
        validationSchema={Yup.object({
          Name: Yup.string().required("برجاء إدخال الإسم"),
          ImgFile: Yup.mixed().required("برجاء إرفاق صورة"),
          Description: Yup.string().required("برجاء إدخال الوصف"),
          CommonUses: Yup.string().required("برجاء إدخال دواعي الإستعمال"),
          Color: Yup.string().required("برجاء إدخال اللون"),
          ScientificName: Yup.string().required("برجاء إدخال الإسم العلمي"),
          AverageYield: Yup.number().required("برجاء إدخال متوسط الحصاد"),
          CulivationTips: Yup.string().required("برجاء إدخال نصائح للزراعة"),
          HarvistingSeason: Yup.string().required("برجاء إدخال موسم الحصاد"),
          IrrigationReqs: Yup.number().required("برجاء إدخال نسبة الري"),
          NutritionalValue: Yup.string().required(
            "برجاء إدخال القيمة الغذائية"
          ),
          PlantingSeason: Yup.string().required("برجاء إدخال موسم الزراعة"),
          SunlightReqs: Yup.string().required("برجاء إدخال نسبة التعرض للضوء"),
          Temperature: Yup.string().required(
            "برجاء إدخال درجة الحرارة الملائمة"
          ),
          SoilsId: Yup.string().required("برجاء إختيار نوع التربة"),
          PlantTypesId: Yup.string().required("خطأ في نوع النبات"),
        })}
      >
        {({ submitForm, resetForm, values, setFieldValue, errors }) => (
          <FormControl
            px={"$5"}
            mb={"$1"}
            pb={"$2"}
            borderWidth='$1'
            borderRadius='$lg'
            borderColor='$borderLight300'
          >
            <VStack gap={"$5"} pt={"$2"} pb={"$1.5"}>
              <FormInput<TPostPlantForm>
                field='ImgFile'
                name='الصورة'
                type='image'
              />
              <FormInput<TPostPlantForm> field='Name' name='الإسم' />
              <FormInput<TPostPlantForm>
                field='ScientificName'
                name='الإسم العلمي'
              />
              <FormInput<TPostPlantForm>
                field='Description'
                name='الوصف'
                type='textare'
              />
              <FormInput<TPostPlantForm> field='Color' name='اللون' />
              <FormInput<TPostPlantForm>
                field='CommonUses'
                name='دواعي الإستعمال'
              />
              <FormInput<TPostPlantForm>
                field='NutritionalValue'
                name='القيمةالغذائية'
              />
              <FormInput<TPostPlantForm>
                field='PlantingSeason'
                name='موسم الزراعة'
              />
              <FormInput<TPostPlantForm>
                field='HarvistingSeason'
                name='موسم الحصاد'
              />
              <FormInput<TPostPlantForm>
                field='Temperature'
                name='درجة الحرارة'
              />
              <FormInput<TPostPlantForm>
                field='AverageYield'
                name='متوسط الحصاد'
                type='number'
              />
              <FormInput<TPostPlantForm>
                field='IrrigationReqs'
                name='نسبة الري'
                type='number'
              />
              <FormInput<TPostPlantForm>
                field='SunlightReqs'
                name='نسبة التعرض للضوء'
              />
              <FormInput<TPostPlantForm>
                field='CulivationTips'
                name='نصائح للزراعة'
                type='textare'
              />
              <View flex={1}>
                <Text fontWeight='bold' size='sm' py={"$1.5"}>
                  نوع التربة :{" "}
                </Text>
                {soils && (
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={soils}
                    search
                    maxHeight={300}
                    labelField={"texture"}
                    valueField={"id"}
                    placeholder={!isFocus ? "اختار نوع تربة " : "..."}
                    searchPlaceholder='بحث...'
                    value={soils?.find((e) => `${e.id}` === values.SoilsId)}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setFieldValue("SoilsId", item.id);
                      setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color={isFocus ? "#298578" : "black"}
                        name='enviroment'
                        size={20}
                      />
                    )}
                  />
                )}
                {errors.SoilsId && (
                  <HStack gap={"$1"} my={"$1.5"} mx={"$3"}>
                    <Text size='xs' color='$red500'>
                      <FontAwesome name='exclamation-circle' />
                    </Text>
                    <Text size='xs' color='$red500'>
                      {errors.SoilsId as string}
                    </Text>
                  </HStack>
                )}
              </View>
            </VStack>
            <HStack
              alignItems='center'
              justifyContent='center'
              gap={"$5"}
              py={"$5"}
            >
              {isLoading ? (
                <Button>
                  <ButtonSpinner></ButtonSpinner>
                </Button>
              ) : (
                <Button onPress={submitForm}>
                  <ButtonText>حفظ</ButtonText>
                </Button>
              )}

              <Button
                onPress={() => resetForm()}
                variant='outline'
                borderColor='$backgroundDark600'
              >
                <ButtonText color='$backgroundDark600'>إعادة تعيين</ButtonText>
              </Button>
            </HStack>
          </FormControl>
        )}
      </Formik>
    </ScrollView>
  );
};

export default PlantForm;

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
