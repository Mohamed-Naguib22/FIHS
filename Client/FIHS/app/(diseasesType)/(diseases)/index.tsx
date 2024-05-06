import { HStack, Text, VStack, View } from "@gluestack-ui/themed";
import React from "react";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import Section from "@/components/layout/Section";

import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useDiseases } from "@/hooks/useDisease";
import Loading from "@/components/layout/Loading";
import SmallCardContainer from "@/components/layout/SmallCardContainer";

export default function Diseases() {
  const router = useRouter();
  const { data: diseases, isLoading } = useDiseases();
  if (isLoading && !diseases) {
    return <Loading />;
  }
  return (
    <View py={"$6"} px={"$2"}>
      <Text mt={10} mb={10} mx={10} fontWeight='900' fontSize={"$lg"}>
        الأمراض
      </Text>
      <SmallCardContainer>
        {diseases?.map((disease, i, arr) => {
          return <Disease key={disease.id} disease={disease} />;
        })}
      </SmallCardContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  plantDiseasesImage: {
    width: "100%",
    height: 110,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

const Disease = ({ disease }: { disease: Disease }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: "rgba(fff, fff,fff,0.9)",
        borderRadius: 10,
        height: 165,
        width: 150,
        borderColor: "rgba(41, 133, 120,0.4)",
        borderWidth: 1,
        marginVertical: 10,
      }}
      onPress={() => router.push(`/(diseasesType)/(diseases)/${disease.id}`)}
    >
      <Image
        style={styles.plantDiseasesImage}
        source={{ uri: disease.imageUrl }}
      />
      <VStack justifyContent='center' alignItems='flex-end' pr={6}>
        <Text textAlign='center' color='#000' pt={6}>
          {disease.species}
        </Text>
        <Text textAlign='center' color='#000' fontWeight='700'>
          {disease.name}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};
