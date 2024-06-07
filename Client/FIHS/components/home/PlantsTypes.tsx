import React from "react";
import { HStack, VStack, Text } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { usePlantTypes, usePlantTypesStatic } from "@/hooks/usePlantType";
import Loading from "../layout/Loading";
import AutoFetching from "../layout/AutoFetching";
import { Image } from "@gluestack-ui/themed";

export default function PlantsTypes() {
  const { data: types, isLoading } = usePlantTypesStatic();
  if (isLoading && !types) {
    return <Loading />;
  }
  return (
    <HStack flexWrap='wrap' justifyContent='space-between' px={"$2"} gap={12}>
      {types?.plantTypes?.map((type) => (
        <PlantType key={type.id} type={type} />
      ))}
    </HStack>
  );
}

const styles = StyleSheet.create({
  PlantsTypesImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
        width: 148,
        borderColor: "rgba(41, 133, 120,0.4)",
        borderWidth: 1,
      }}
      onPress={() => router.push(`/(plants)/types/${type.id}/`)}
    >
      <Image
        style={styles.PlantsTypesImage}
        source={type.imgURL}
        rounded={"$md"}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        alt='types'
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
