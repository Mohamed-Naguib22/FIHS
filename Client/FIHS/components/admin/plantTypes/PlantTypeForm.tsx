import { ButtonSpinner, ScrollView, VStack } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { FormControl } from "@gluestack-ui/themed";
import { useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormInput from "../FormInput";
import { PostPlantType, TPostPlantType } from "@/hooks/usePlantType";
import * as Yup from "yup";

const PlantTypeForm = () => {
  const navigate = useNavigation();
  const router = useRouter();
  const postPlantType = PostPlantType();
  useEffect(() => {
    navigate.setOptions({
      title: "نوع نبات جديد",
    });
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView flex={1}>
      <Formik<TPostPlantType>
        initialValues={{
          Name: "",
          HeightRange: "",
          SpreadRange: "",
          LifeCycle: "",
          //@ts-ignore
          Image: undefined,
        }}
        onSubmit={(vals, { resetForm }) => {
          console.log(vals);
          setIsLoading(true);
          postPlantType.mutate(vals, {
            onSuccess(data, variables, context) {
              resetForm();
              router.push("/(admin)/plantTypes");
            },
          });
          setIsLoading(false);
        }}
        validationSchema={Yup.object({
          Name: Yup.string().required("برجاء إدخال الإسم"),
          HeightRange: Yup.string().required("برجاء إدخال مدي ارتفاع النبات"),
          SpreadRange: Yup.string().required("برجاء إدخال مدي الانتشار"),
          LifeCycle: Yup.string().required("برجاء إدخال دورة الحياة"),
          Image: Yup.mixed().required("برجاء إرفاق صورة"),
        })}
      >
        {({ submitForm, resetForm }) => (
          <FormControl
            px={"$5"}
            mb={"$1"}
            pb={"$2"}
            borderWidth='$1'
            borderRadius='$lg'
            borderColor='$borderLight300'
          >
            <VStack gap={"$5"} pt={"$2"} pb={"$1.5"}>
              <FormInput<TPostPlantType>
                field='Image'
                name='الصورة'
                type='image'
              />
              <FormInput<TPostPlantType> field='Name' name='الإسم' />
              <FormInput<TPostPlantType> field='LifeCycle' name='دورة الحياة' />
              <FormInput<TPostPlantType>
                field='SpreadRange'
                name='مدي الانتشار'
              />
              <FormInput<TPostPlantType>
                field='HeightRange'
                name='مدي طول النبات'
              />
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

export default PlantTypeForm;
