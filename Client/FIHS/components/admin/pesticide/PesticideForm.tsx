import { ButtonSpinner, ScrollView, VStack } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { FormControl } from "@gluestack-ui/themed";
import { useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormInput from "../FormInput";
import {
  PesticideSchema,
  Pesticide as TPesticideForm,
} from "@/models/Pesticide";
import { PostPesticide, UpdatePesticide } from "@/hooks/usePesticide";

type Props = {
  initial?: Pesticide;
};

const PesticideForm = ({ initial }: Props) => {
  const navigate = useNavigation();
  const router = useRouter();
  const postPesticide = PostPesticide();
  const updatePesticide = UpdatePesticide();
  useEffect(() => {
    navigate.setOptions({
      title: initial?.id ? `تعديل مبيد ${initial.name}` : "مبيد جديد",
    });
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView flex={1}>
      <Formik<TPesticideForm>
        initialValues={{
          name: initial?.name ?? "",
          manufactuer: initial?.manufactuer ?? "",
          usageInstructions: initial?.usageInstructions ?? "",
          description: initial?.description ?? "",
          toxicity: initial?.toxicity ?? "",
          type: initial?.type ?? "",
          //@ts-ignore
          image: initial?.imageURL ?? undefined,
        }}
        onSubmit={(vals, { resetForm }) => {
          console.log(vals);
          setIsLoading(true);
          if (!initial?.id) {
            postPesticide.mutate(vals, {
              onSuccess(data, variables, context) {
                resetForm();
                router.push("/(admin)/pesticides");
              },
            });
          } else {
            updatePesticide.mutate(
              {
                id: initial.id,
                data: vals,
              },
              {
                onSuccess(data, variables, context) {
                  resetForm();
                  router.push("/(admin)/pesticides");
                },
              }
            );
          }
          setIsLoading(false);
        }}
        validationSchema={PesticideSchema}
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
              <FormInput<TPesticideForm>
                field='image'
                name='الصورة'
                type='image'
              />
              <FormInput<TPesticideForm> field='name' name='الإسم' />
              <FormInput<TPesticideForm> field='manufactuer' name='المُصنع' />
              <FormInput<TPesticideForm> field='type' name='النوع' />
              <FormInput<TPesticideForm>
                field='description'
                name='الوصف'
                type='textare'
              />
              <FormInput<TPesticideForm> field='toxicity' name='درجة السمية' />
              <FormInput<TPesticideForm>
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

export default PesticideForm;
