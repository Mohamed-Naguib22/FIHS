import React from "react";
import { Text, View } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { usePlantTypes } from "@/hooks/usePlantType";
import Loading from "@/components/layout/Loading";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import AutoFetching from "@/components/layout/AutoFetching";

export default function AllPlantTypes() {
  const {
    data: types,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePlantTypes(6);
  if (isLoading && !types) {
    return <Loading />;
  }

  return (
    <AutoFetching
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    >
      <View py={"$6"} px={"$2"}>
        <Text mt={10} mb={10} mx={10} fontWeight='900' fontSize={"$lg"}>
          انواع النباتات
        </Text>
        <SmallCardContainer>
          {types?.pages?.map((page) =>
            page.plantTypes.map((type) => {
              return <PlantType key={type.id} type={type} />;
            })
          )}
        </SmallCardContainer>
      </View>
    </AutoFetching>
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
      onPress={() => router.push(`/(plants)/types/${type.id}`)}
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
