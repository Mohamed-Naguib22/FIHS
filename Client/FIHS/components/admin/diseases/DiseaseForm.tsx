import { Disease as TDiseaseForm, DiseaseSchema } from "@/models/disease";
import { ButtonSpinner, ScrollView, VStack } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { FormControl } from "@gluestack-ui/themed";
import { useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { PostDisease, UpdateDisease } from "@/hooks/useDisease";
import FormInput from "../FormInput";

type Props = {
  initial?: Disease;
};

const DiseaseForm = ({ initial }: Props) => {
  const navigate = useNavigation();
  const router = useRouter();
  const postDisease = PostDisease();
  const updateDisease = UpdateDisease();
  navigate.setOptions({
    title: initial?.id ? `تعديل مرض ${initial.name}` : "مرض جديد",
  });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView flex={1}>
      <Formik<TDiseaseForm>
        initialValues={{
          name: initial?.name ?? "",
          causes: initial?.causes ?? "",
          description: initial?.description ?? "",
          preventionMethods: initial?.preventionMethods ?? "",
          scientificName: initial?.scientificName ?? "",
          species: initial?.species ?? "",
          symptoms: initial?.symptoms ?? "",
          treatments: initial?.treatments ?? "",
          //@ts-ignore
          image: initial?.imageUrl ?? undefined,
        }}
        onSubmit={(vals, { resetForm }) => {
          console.log(vals);
          setIsLoading(true);
          if (!initial?.id) {
            postDisease.mutate(vals, {
              onSuccess(data, variables, context) {
                resetForm();
                router.push("/(admin)/diseases");
              },
            });
          } else {
            updateDisease.mutate(
              {
                id: initial.id,
                data: vals,
              },
              {
                onSuccess(data, variables, context) {
                  resetForm();
                  router.push("/(admin)/diseases");
                },
              }
            );
          }
          setIsLoading(false);
        }}
        validationSchema={DiseaseSchema}
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
              <FormInput<TDiseaseForm>
                field='image'
                name='الصورة'
                type='image'
              />
              <FormInput<TDiseaseForm> field='species' name='الفصيلة' />
              <FormInput<TDiseaseForm>
                field='scientificName'
                name='الإسم العلمي'
              />
              <FormInput<TDiseaseForm> field='name' name='الإسم' />
              <FormInput<TDiseaseForm>
                field='description'
                name='الوصف'
                type='textare'
              />
              <FormInput<TDiseaseForm>
                field='causes'
                name='الاسباب'
                type='textare'
              />
              <FormInput<TDiseaseForm>
                field='symptoms'
                name='الاعراض'
                type='textare'
              />
              <FormInput<TDiseaseForm>
                field='preventionMethods'
                name='طرق الوقايه'
                type='textare'
              />
              <FormInput<TDiseaseForm>
                field='treatments'
                name='طرق العلاج'
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

export default DiseaseForm;
