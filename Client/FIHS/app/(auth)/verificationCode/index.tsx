import React, { useState } from "react";
import {
  Button,
  ButtonText,
  View,
  Text,
  VStack,
  ImageBackground,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useResendCode, useVerify } from "@/hooks/useLogin";

export default function index() {
  <OtpInput numberOfDigits={6} />;
  const [code, setCode] = useState("");
  const resendCode = useResendCode();
  const verify = useVerify();
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
          height: 250,
          borderRadius: 20,
        }}
      >
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
            تأكيد الكود
          </Text>

          <View marginTop={12} direction='ltr'>
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
              onTextChange={(text) => console.log(text)}
              onFilled={(text) => setCode(text)}
            />
          </View>

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
              disabled={code.length != 6}
              onPress={() => verify.mutate({ verificationCode: code })}
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
      </SafeAreaView>
      <View
        w={300}
        h={300}
        backgroundColor='rgba(41, 133, 120,0.9)'
        borderRadius={150}
        top={450}
        left={20}
        zIndex={2}
        flex={0}
        justifyContent='center'
      >
        <Text padding={20} color='white'>
          سيتم ارسال الكود في رساله عبر الايميل الذي تم التسجيل به
        </Text>
      </View>
      <View
        w={150}
        h={150}
        backgroundColor='rgba(41, 133, 120,0.9)'
        borderRadius={100}
        top={350}
        left={20}
        zIndex={1}
      ></View>
      <View
        w={150}
        h={150}
        backgroundColor='rgba(41, 133, 120,0.9)'
        borderRadius={100}
        top={0}
        left={250}
        zIndex={1}
      ></View>
    </ImageBackground>
  );
}
