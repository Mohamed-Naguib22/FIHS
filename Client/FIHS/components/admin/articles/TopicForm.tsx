import { ButtonSpinner, ScrollView, VStack } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { FormControl } from "@gluestack-ui/themed";
import { useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormInput from "../FormInput";
import { PostTopic } from "@/hooks/useArticles";

type TopicPost = { name: ArticleTopic["name"] };

const TopicForm = () => {
  const navigate = useNavigation();
  const router = useRouter();
  const postTopic = PostTopic();
  useEffect(() => {
    navigate.setOptions({
      title: "موضوع جديد",
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView flex={1}>
      <Formik<TopicPost>
        initialValues={{
          name: "",
        }}
        onSubmit={(vals, { resetForm }) => {
          console.log(vals);
          setIsLoading(true);
          postTopic.mutate(vals, {
            onSuccess(data, variables, context) {
              resetForm();
              router.push("/(admin)/articles-topics");
            },
          });
          setIsLoading(false);
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("برجاء إدخال إسم الموضوع"),
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
              <FormInput<TopicPost> field='name' name='الإسم' />
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

export default TopicForm;
