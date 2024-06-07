import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  Button,
  ButtonText,
  View,
  Text,
  HStack,
  VStack,
  Input,
  ImageBackground,
  FormControl,
} from "@gluestack-ui/themed";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import Logo from "@/components/layout/Logo";
import useLogin from "@/hooks/useLogin";
import { Formik } from "formik";
import { Login, LoginSchema } from "./../../../models/Login";
type Props = {};
const LoginPage = (props: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const router = useRouter();
  const login = useLogin();
  return (
    <ImageBackground
      style={{
        backgroundColor: "",
        height: "100%",
        width: "100%",
      }}
      source={require("@/assets/images/LoginBG.png")}
    >
      <StatusBar style='light' />
      <View
        position='absolute'
        top={40}
        left={"$1/2"}
        transform={"translateX(-40px)"}
      >
        <Logo />
      </View>
      <View
        position='absolute'
        top={140}
        left={"$1/2"}
        transform={"translateX(-120px)"}
        bg='rgba(41, 133, 120,0.6)'
        maxWidth={"$64"}
        p={"$5"}
        rounded={"$md"}
      >
        <Text textAlign='center' color='$textDark100' pb={"$2.5"}>
          اهلا بك في FIHS !
        </Text>
        <Text textAlign='center' color='$textDark300' size='sm'>
          سجل دخولك الان في FIHS لتتمتع بكامل المزايا المتوفرة في التطبيق!
        </Text>
      </View>
      <SafeAreaView
        style={{
          backgroundColor: "rgba(41, 133, 120,0.9)",
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
          height: 500,
          borderTopEndRadius: 50,
          borderTopStartRadius: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            marginHorizontal: 15,
          }}
        >
          <Formik<LoginSchema>
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Login}
            onSubmit={(vals) => {
              login.mutate(vals);
            }}
          >
            {({ handleBlur, setFieldValue, isValid, errors, submitForm }) => {
              return (
                <FormControl>
                  <Text
                    textAlign='center'
                    color='$white'
                    fontSize={25}
                    fontWeight='800'
                    pt={30}
                    pb={10}
                  >
                    تسجيل الدخول
                  </Text>
                  <View>
                    <Text
                      fontSize={18}
                      fontWeight='400'
                      color='$white'
                      marginVertical={5}
                      marginRight={15}
                    >
                      البريد الالكتروني{" "}
                    </Text>
                    <View
                      style={{
                        width: "92%",
                        marginRight: 12,
                        marginLeft: 12,
                        height: 48,
                        borderColor: "#fff",
                        borderWidth: 1,
                        borderTopEndRadius: 10,
                        borderBottomStartRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                      }}
                    >
                      <TextInput
                        style={{
                          width: "100%",
                          textAlign: "right",
                          padding: 8,
                        }}
                        onBlur={handleBlur("email")}
                        onChangeText={(e) => setFieldValue("email", e)}
                      />
                    </View>
                    {errors.email && (
                      <HStack gap={"$1"} my={"$1.5"} mx={"$3"}>
                        <Text size='xs' color='$textLight200'>
                          <FontAwesome name='exclamation-circle' />
                        </Text>
                        <Text size='xs' color='$textLight200'>
                          {errors.email}
                        </Text>
                      </HStack>
                    )}
                  </View>
                  <View marginTop={10}>
                    <Text
                      onPress={() => router.push("/(auth)/resetPassword")}
                      fontSize={18}
                      fontWeight='400'
                      color='$white'
                      marginVertical={5}
                      marginRight={12}
                    >
                      {" "}
                      كلمه المرور{" "}
                    </Text>
                    <View
                      style={{
                        marginRight: 12,
                        marginLeft: 12,
                        width: "92%",
                        height: 48,
                        borderColor: "#fff",
                        borderWidth: 1,
                        borderTopEndRadius: 10,
                        borderBottomStartRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        backgroundColor: "#fff",
                      }}
                    >
                      <TextInput
                        style={{
                          width: "100%",
                          textAlign: "right",
                          padding: 8,
                        }}
                        secureTextEntry={isPasswordShown}
                        onBlur={handleBlur("password")}
                        onChangeText={(e) => setFieldValue("password", e)}
                      />
                      <TouchableOpacity
                        onPress={() => setIsPasswordShown(!isPasswordShown)}
                        style={{
                          position: "absolute",
                          left: 12,
                        }}
                      >
                        {isPasswordShown == true ? (
                          <Ionicons name='eye-off' size={24} />
                        ) : (
                          <Ionicons name='eye' size={24} />
                        )}
                      </TouchableOpacity>
                    </View>
                
                    {errors.password && (
                      <HStack gap={"$1"} my={"$1.5"} mx={"$3"}>
                        <Text size='xs' color='$textLight200'>
                          <FontAwesome name='exclamation-circle' />
                        </Text>
                        <Text size='xs' color='$textLight200'>
                          {errors.password}
                        </Text>
                      </HStack>
                    )}
                  </View>
                  <Text
                    marginHorizontal={8}
                    color='#fff'
                    fontSize={12}
                    mx={"$3"}
                    onPress={() => router.push("/(auth)/changePassword")}
                  >
                    هل نسيت كلمه المرور؟
                  </Text>
                  <HStack justifyContent='center' marginVertical={10}>
                    <Button
                      w={130}
                      h={"$12"}
                      backgroundColor='$white'
                      mb={20}
                      borderBottomStartRadius={10}
                      borderTopEndRadius={10}
                      onPress={isValid ? submitForm : undefined}
                    >
                      <ButtonText color='#000'>تسجيل الدخول </ButtonText>
                    </Button>
                  </HStack>
                  <View flexDirection='row' alignItems='center' my={2}>
                    <View
                      style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: "#fff",
                        marginHorizontal: 10,
                      }}
                    />
                    <Text style={{ fontSize: 14, color: "#fff" }}>او </Text>
                    <View
                      style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: "#fff",
                        marginHorizontal: 10,
                      }}
                    />
                  </View>
                  {/* <HStack justifyContent='center' gap={20} pt={25}>
                    <View
                      bgColor='#fff'
                      borderRadius={15}
                      w={55}
                      h={55}
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={require("@/assets/images/google-icon.png")}
                      />
                    </View>
                    <View
                      bgColor='#fff'
                      borderRadius={15}
                      w={55}
                      h={55}
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Ionicons
                        name='logo-facebook'
                        color='#0866FF'
                        size={40}
                      />
                    </View>
                  </HStack> */}
                  <Text
                    textAlign='center'
                    color='#e5e5e5'
                    fontSize={14}
                    fontWeight='800'
                    pt={20}
                  >
                    <Text
                      color='$textLight50'
                      fontSize={14}
                      underline
                      fontWeight='800'
                      onPress={() => router.push("/(auth)/register")}
                    >
                      لا تمتلك حساباً؟
                    </Text>
                  </Text>
                </FormControl>
              );
            }}
          </Formik>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginPage;
