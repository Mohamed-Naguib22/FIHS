import React, { useState } from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  Button,
  ButtonText,
  HStack,
  VStack,
} from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

type Props = {};

const PlantDiseases = (props: Props) => {
  // const [showActionsheet, setShowActionsheet] = useState(false)
  const router = useRouter();
  return (
    <>
      <VStack
        gap={"$5"}
        h={"$full"}
        alignItems='center'
        justifyContent='center'
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.diseasesDiv}
          onPress={() => router.push("/(diseasesType)/diseases")}
        >
          <VStack gap={"$0.5"} alignItems='center'>
            <Image
              style={{ width: 125, height: 125, objectFit: "cover" }}
              source={require("@/assets/images/diseases.png")}
              alt='diseases'
            />
            <ButtonText color='#298578' fontSize={18} fontWeight='800'>
              الأمراض
            </ButtonText>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.diseasesDiv}
          onPress={() => router.push("/(diseasesType)/pests")}
        >
          <VStack gap={"$0.5"} alignItems='center'>
            <Image
              style={{ width: 125, height: 125, objectFit: "cover" }}
              source={require("@/assets/images/Pests.png")}
            />
            <ButtonText color='#298578' fontSize={18} fontWeight='800'>
              الأفات
            </ButtonText>
          </VStack>
        </TouchableOpacity>
      </VStack>
    </>
  );
};

export default PlantDiseases;
const styles = StyleSheet.create({
  diseasesDiv: {
    borderColor: "#298578",
    borderRadius: 20,
    borderWidth: 1,
    width: 200,
    padding: 18,
  },
});
