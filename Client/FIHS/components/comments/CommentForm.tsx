import React, { useEffect } from "react";
import { Formik, useFormikContext } from "formik";
import { ICommentForm, CommentFormSchema } from "@/models/CommentForm";
import {
  FormControl,
  VStack,
  View,
  Text,
  Heading,
  Input,
  InputField,
  HStack,
  Button,
  ButtonText,
  TextareaInput,
} from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { Textarea } from "@gluestack-ui/themed";
import { PostComment, UpdateComment } from "@/hooks/useComment";
type Props = {
  entityId: TComment["entityId"];
  entityType: TComment["entityType"];
  toBeUpdated: TComment | null;
  setToBeUpdated: (comment: TComment | null) => void;
};

const CommentForm = ({
  entityId,
  entityType,
  toBeUpdated,
  setToBeUpdated,
}: Props) => {
  const postComment = PostComment();
  const updateComment = UpdateComment();
  // const { setFieldValue } = useFormikContext();
  // useEffect(() => {
  //   // if (toBeUpdated) {
  //   //   setFieldValue("commentBody", toBeUpdated.commentBody);
  //   //   // setFieldValue("entityId", toBeUpdated.entityId);
  //   //   // setFieldValue("entityType", toBeUpdated.entityType);
  //   // } else {
  //   //   setFieldValue("commentBody", undefined);
  //   //   setFieldValue("entityId", undefined);
  //   //   setFieldValue("entityType", undefined);
  //   // }
  // }, [toBeUpdated]);
  return (
    <Formik<ICommentForm>
      initialValues={{
        //@ts-ignore
        commentBody: undefined,
        entityId: entityId,
        entityType: entityType,
      }}
      onSubmit={(vals, { resetForm }) => {
        console.log(vals);
        resetForm();
        if (toBeUpdated) {
          updateComment.mutateAsync(
            {
              id: toBeUpdated.id,
              vals: {
                commentBody: toBeUpdated.commentBody,
                entityId: toBeUpdated.entityId,
                entityType: toBeUpdated.entityType,
              },
            },
            {
              onSuccess(data, variables, context) {
                setToBeUpdated(null);
              },
            }
          );
        } else {
          postComment.mutateAsync(vals);
        }
      }}
      validationSchema={CommentFormSchema}
    >
      {({ setFieldValue, handleBlur, submitForm, values, errors }) => (
        <FormControl
          px={"$5"}
          mt={"$1"}
          mb={"$1"}
          py={"$5"}
          borderWidth='$1'
          borderRadius='$lg'
          borderColor='$borderLight300'
          bg='$backgroundDark0'
        >
          <Heading color='$textDark900' size='md' lineHeight='$md'>
            إضافة تعليق
          </Heading>
          <VStack gap={"$5"} pt={"$2"} pb={"$1.5"}>
            <View flex={1}>
              <Text fontWeight='bold' size='sm' py={"$1.5"}>
                محتوي التعليق :{" "}
              </Text>
              <Textarea
                size='md'
                id={"newPassword"}
                isInvalid={!!errors.commentBody}
                isReadOnly={false}
              >
                <TextareaInput
                  onChangeText={(e) => setFieldValue("commentBody", e)}
                  onBlur={handleBlur("commentBody")}
                  defaultValue={values.commentBody}
                />
              </Textarea>
              {errors.commentBody && (
                <HStack gap={"$1"} my={"$1.5"} mx={"$3"}>
                  <Text size='xs' color='$red500'>
                    <FontAwesome name='exclamation-circle' />
                  </Text>
                  <Text size='xs' color='$red500'>
                    {errors.commentBody}
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
            <Button onPress={submitForm}>
              <ButtonText>حفظ</ButtonText>
            </Button>
          </HStack>
        </FormControl>
      )}
    </Formik>
  );
};

export default CommentForm;
