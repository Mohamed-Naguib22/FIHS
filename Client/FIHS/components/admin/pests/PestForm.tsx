import { ButtonSpinner, ScrollView, VStack } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { FormControl } from "@gluestack-ui/themed";
import { useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import FormInput from "../FormInput";
import { Pest as TPestForm, PestSchema } from "@/models/Pest";
import { PostPest, UpdatePest } from "@/hooks/usePest";

type Props = {
  initial?: Pest;
};

const PestForm = ({ initial }: Props) => {
  const navigate = useNavigation();
  const router = useRouter();
  const postPest = PostPest();
  const updatePest = UpdatePest();
  navigate.setOptions({
    title: initial?.id ? `تعديل افه ${initial.name}` : "افه جديد",
  });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView flex={1}>
      <Formik<TPestForm>
        initialValues={{
          name: initial?.name ?? "",
          description: initial?.description ?? "",
          controlMethods: initial?.controlMethods ?? "",
          scientificName: initial?.scientificName ?? "",
          species: initial?.species ?? "",
          damageSymptoms: initial?.damageSymptoms ?? "",
          geographicDistribution: initial?.geographicDistribution ?? "",
          lifeCycle: initial?.lifeCycle ?? "",
          reproduction: initial?.reproduction ?? "",
          //@ts-ignore
          image: initial?.imageUrl ?? undefined,
        }}
        onSubmit={(vals, { resetForm }) => {
          console.log(vals);
          setIsLoading(true);
          if (!initial?.id) {
            postPest.mutate(vals, {
              onSuccess(data, variables, context) {
                resetForm();
                router.push("/(admin)/pests");
              },
            });
          } else {
            updatePest.mutate(
              {
                id: initial.id,
                data: vals,
              },
              {
                onSuccess(data, variables, context) {
                  resetForm();
                  router.push("/(admin)/pests");
                },
              }
            );
          }
          setIsLoading(false);
        }}
        validationSchema={PestSchema}
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
              <FormInput<TPestForm> field='image' name='الصورة' type='image' />
              <FormInput<TPestForm> field='species' name='الفصيلة' />
              <FormInput<TPestForm>
                field='scientificName'
                name='الإسم العلمي'
              />
              <FormInput<TPestForm> field='name' name='الإسم' />
              <FormInput<TPestForm>
                field='description'
                name='الوصف'
                type='textare'
              />
              <FormInput<TPestForm>
                field='lifeCycle'
                name='دورة الحياة'
                type='textare'
              />
              <FormInput<TPestForm>
                field='damageSymptoms'
                name='الاعراض'
                type='textare'
              />
              <FormInput<TPestForm>
                field='controlMethods'
                name='طرق الوقايه'
                type='textare'
              />
              <FormInput<TPestForm>
                field='reproduction'
                name='طرق التكاثر'
                type='textare'
              />
              <FormInput<TPestForm>
                field='geographicDistribution'
                name='اماكن الانتشار'
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

export default PestForm;
