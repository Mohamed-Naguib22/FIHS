import React from "react";
import { useRouter } from "expo-router";
import {
  Button,
  ButtonText,
  View,
  Text,
  VStack,
  ImageBackground,
} from "@gluestack-ui/themed";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { ForgetPassword, ForgetPasswordSchema } from "@/models/ForgetPassword";
import CustomInput from "@/components/profile/CustomInput";
import { HStack } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { useForgetPassword } from "@/hooks/useProfile";

export default function index() {
  const router = useRouter();
  const sendEmail = useForgetPassword();
  return (
    <ImageBackground
      style={{
        backgroundColor: "",
        height: "100%",
        width: "100%",
      }}
      source={require("@/assets/images/LoginBG.png")}
      alt='background image'
    >
      <SafeAreaView
        style={{
          backgroundColor: "#fff",
          top: "35%",
          width: "100%",
          left: 0,
          right: 0,
          position: "absolute",
          minHeight: 250,
          borderRadius: 20,
        }}
      >
        <Formik<ForgetPasswordSchema>
          initialValues={{
            email: "",
          }}
          onSubmit={(vals) => {
            const { email } = vals;
            sendEmail.mutate({ email });
          }}
          validationSchema={ForgetPassword}
        >
          {({
            setFieldValue,
            handleBlur,
            submitForm,
            resetForm,
            values,
            initialValues,
            errors,
          }) => {
            return (
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 15,
                }}
              >
                <Text
                  textAlign='center'
                  color='$000'
                  fontSize={25}
                  fontWeight='800'
                  pt={35}
                  pb={30}
                >
                  {" "}
                  اعاده تعيين كلمه المرور
                </Text>
                <VStack mx={"$1.5"}>
                  <Text fontWeight='bold' py={"$1.5"}>
                    البريد الإلكتروني :{" "}
                  </Text>
                  <CustomInput
                    name='email'
                    onChangeText={setFieldValue.bind(null, "email") as any}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </VStack>
                {errors.email && (
                  <HStack gap={"$1"} my={"$1.5"} mx={"$3"}>
                    <Text size='xs' color='$red500'>
                      <FontAwesome name='exclamation-circle' />
                    </Text>
                    <Text size='xs' color='$red500'>
                      {errors.email}
                    </Text>
                  </HStack>
                )}

                <VStack
                  justifyContent='center'
                  alignItems='center'
                  marginVertical={10}
                >
                  <Button
                    w={130}
                    h={"$12"}
                    backgroundColor='rgba(41, 133, 120,0.9)'
                    mb={10}
                    mt={10}
                    borderBottomStartRadius={10}
                    borderTopEndRadius={10}
                    onPress={submitForm}
                  >
                    <ButtonText color='#fff'>ارسال الكود</ButtonText>
                  </Button>
                </VStack>
              </View>
            );
          }}
        </Formik>
      </SafeAreaView>
    </ImageBackground>
  );
}
