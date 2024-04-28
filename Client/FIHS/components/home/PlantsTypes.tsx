import React from "react";
import { HStack, VStack, Text } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { usePlantTypes } from "@/hooks/usePlantType";
import Loading from "../layout/Loading";

export default function PlantsTypes() {
  const { data: types, isLoading } = usePlantTypes();
  if (isLoading && !types) {
    return <Loading />;
  }
  return (
    <VStack justifyContent='space-between' gap={15}>
      {types?.map((type, i, arr) => {
        return (
          <HStack
            justifyContent='space-between'
            alignItems='center'
            gap={18}
            px={"$3"}
          >
            <PlantType key={type.id} type={type} />
            {arr[i + 1] && <PlantType key={arr[i + 1].id} type={arr[i + 1]} />}
          </HStack>
        );
      })}
    </VStack>
  );
}

const styles = StyleSheet.create({
  PlantsTypesImage: {
    width: "100%",
    height: 140,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

const PlantType = ({ type }: { type: PlantType }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: "rgba(fff, fff,fff,0.9)",
        borderRadius: 10,
        minHeight: 180,
        width: 150,
        borderColor: "rgba(41, 133, 120,0.4)",
        borderWidth: 1,
      }}
      onPress={() => router.push(`/plantType/${type.name}`)}
    >
      <Image
        style={styles.PlantsTypesImage}
        source={require("@/assets/images/PlantType.jpg")}
      />
      <Text
        textAlign='center'
        color='#298578'
        marginRight={5}
        fontWeight='700'
        pt={6}
      >
        {type.name}
      </Text>
    </TouchableOpacity>
  );
};
