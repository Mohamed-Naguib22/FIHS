import { ButtonSpinner, ScrollView, VStack } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { FormControl } from "@gluestack-ui/themed";
import { useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import FormInput from "../FormInput";
import {
  FertilizerSchema,
  Fertilizer as TFertilizerForm,
} from "@/models/Fertilizer";
import { PostFertilizer, UpdateFertilizer } from "@/hooks/useFertilizer";

type Props = {
  initial?: Fertilizer;
};

const FertilizerForm = ({ initial }: Props) => {
  const navigate = useNavigation();
  const router = useRouter();
  const postFertilizer = PostFertilizer();
  const updateFertilizer = UpdateFertilizer();
  navigate.setOptions({
    title: initial?.id ? `تعديل سماد ${initial.name}` : "سماد جديد",
  });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView flex={1}>
      <Formik<TFertilizerForm>
        initialValues={{
          name: initial?.name ?? "",
          manufactuer: initial?.manufactuer ?? "",
          usageInstructions: initial?.usageInstructions ?? "",
          //@ts-ignore
          image: initial?.imageURL ?? undefined,
        }}
        onSubmit={(vals, { resetForm }) => {
          console.log(vals);
          setIsLoading(true);
          if (!initial?.id) {
            postFertilizer.mutate(vals, {
              onSuccess(data, variables, context) {
                resetForm();
                router.push("/(admin)/fertilizers");
              },
            });
          } else {
            updateFertilizer.mutate(
              {
                id: initial.id,
                data: vals,
              },
              {
                onSuccess(data, variables, context) {
                  resetForm();
                  router.push("/(admin)/fertilizers");
                },
              }
            );
          }
          setIsLoading(false);
        }}
        validationSchema={FertilizerSchema}
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
              <FormInput<TFertilizerForm>
                field='image'
                name='الصورة'
                type='image'
              />
              <FormInput<TFertilizerForm> field='name' name='الإسم' />
              <FormInput<TFertilizerForm> field='manufactuer' name='المُصنع' />
              <FormInput<TFertilizerForm>
                field='usageInstructions'
                name='طرق الاستعمال'
                type='textare'
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

export default FertilizerForm;
