import React from "react";
import {
  Button,
  ButtonText,
  View,
  Text,
  HStack,
  VStack,
  ImageBackground,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";
import { useResendCode } from "@/hooks/useLogin";
import { Formik } from "formik";
import {
  ForgetPasswordReset,
  ForgetPasswordResetSchema,
} from "@/models/ForgetPasswordReset";
import { useResetPassword } from "@/hooks/state/useResetPassword";
import CustomInput from "@/components/profile/CustomInput";
import { useForgetPasswordReset } from "@/hooks/useProfile";

export default function index() {
  <OtpInput numberOfDigits={6} onTextChange={(text) => console.log(text)} />;
  const resendCode = useResendCode();
  const { token, email } = useResetPassword();
  const resetPassword = useForgetPasswordReset();
  return (
    <ImageBackground
      style={{
        backgroundColor: "",
        height: "100%",
        width: "100%",
      }}
      source={require("@/assets/images/LoginBG.png")}
    >
      <SafeAreaView
        style={{
          backgroundColor: "white",
          top: "20%",
          width: "96%",
          left: 0,
          marginLeft: "2%",
          right: 0,
          position: "absolute",
          minHeight: 250,
          borderRadius: 20,
        }}
      >
        <Formik<ForgetPasswordResetSchema>
          initialValues={{
            email: email,
            token: token,
            verificationCode: "",
            newPassword: "",
            newPasswordVerify: "",
          }}
          onSubmit={(vals, { setFieldError }) => {
            if (vals.newPassword !== vals.newPasswordVerify) {
              setFieldError(
                "newPasswordVerify",
                "تأكيد كلمة المرور غير متطابقة مع كلمة المرور"
              );
            } else {
              console.log(vals);
              resetPassword.mutate(vals);
            }
          }}
          validationSchema={ForgetPasswordReset}
        >
          {({ setFieldValue, handleBlur, submitForm, values, errors }) => {
            return (
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 15,
                }}
              >
                <Text
                  textAlign='center'
                  color='$black'
                  fontSize={25}
                  fontWeight='800'
                  pt={30}
                  pb={10}
                >
                  إعادة تعيين كلمة المرور
                </Text>

                <VStack mx={"$3"}>
                  <OtpInput
                    theme={{
                      containerStyle: { direction: "ltr" },
                      inputsContainerStyle: {
                        direction: "ltr",
                        display: "flex",
                        flexDirection: "row-reverse",
                      },
                      filledPinCodeContainerStyle: { direction: "ltr" },
                      focusedPinCodeContainerStyle: { direction: "ltr" },
                      focusStickStyle: { direction: "ltr" },
                      pinCodeContainerStyle: { direction: "ltr" },
                      pinCodeTextStyle: {
                        direction: "ltr",
                        textAlign: "left",
                      },
                    }}
                    numberOfDigits={6}
                    focusColor='rgba(41, 133, 120,0.9)'
                    focusStickBlinkingDuration={500}
                    onTextChange={(code) =>
                      setFieldValue("verificationCode", code)
                    }
                  />
                  {errors.verificationCode && (
                    <HStack gap={"$1"} my={"$1.5"} mx={"$3"}>
                      <Text size='xs' color='$red500'>
                        <FontAwesome name='exclamation-circle' />
                      </Text>
                      <Text size='xs' color='$red500'>
                        {errors.verificationCode}
                      </Text>
                    </HStack>
                  )}
                </VStack>
                <VStack mx={"$2.5"}>
                  <Text fontWeight='bold' py={"$1.5"}>
                    كلمة المرور الجديدة :{" "}
                  </Text>
                  <CustomInput
                    name='newPassword'
                    onChangeText={
                      setFieldValue.bind(null, "newPassword") as any
                    }
                    onBlur={handleBlur}
                    type='password'
                    value={values.newPassword}
                  />
                </VStack>
                {errors.newPassword && (
                  <HStack gap={"$1"} my={"$1.5"} mx={"$3"}>
                    <Text size='xs' color='$red500'>
                      <FontAwesome name='exclamation-circle' />
                    </Text>
                    <Text size='xs' color='$red500'>
                      {errors.newPassword}
                    </Text>
                  </HStack>
                )}
                <VStack mx={"$2.5"}>
                  <Text fontWeight='bold' py={"$1.5"}>
                    تأكيد كلمة المرور الجديدة :{" "}
                  </Text>
                  <CustomInput
                    name='newPasswordVerify'
                    onChangeText={
                      setFieldValue.bind(null, "newPasswordVerify") as any
                    }
                    onBlur={handleBlur}
                    type='password'
                    value={values.newPasswordVerify}
                  />
                </VStack>
                {errors.newPasswordVerify && (
                  <HStack gap={"$1"} my={"$1.5"} mx={"$3"}>
                    <Text size='xs' color='$red500'>
                      <FontAwesome name='exclamation-circle' />
                    </Text>
                    <Text size='xs' color='$red500'>
                      {errors.newPasswordVerify}
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
                    backgroundColor='$rgba(41, 133, 120,0.9)'
                    mb={10}
                    mt={10}
                    borderBottomStartRadius={10}
                    borderTopEndRadius={10}
                    onPress={submitForm}
                  >
                    <ButtonText color='#fff'>تأكيد</ButtonText>
                  </Button>
                  <VStack gap={"$1.5"} my={"$1.5"}>
                    <Text onPress={() => resendCode.mutate()}>
                      اعادة ارسال رمز التحقق؟
                    </Text>
                  </VStack>
                </VStack>
              </View>
            );
          }}
        </Formik>
      </SafeAreaView>
    </ImageBackground>
  );
}
