import { HStack, Text, VStack, View, Image } from "@gluestack-ui/themed";
import React from "react";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import Section from "@/components/layout/Section";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useDiseases } from "@/hooks/useDisease";
import Loading from "@/components/layout/Loading";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import AutoFetching from "@/components/layout/AutoFetching";

export default function Diseases() {
  const {
    data: diseases,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDiseases();
  if (isLoading && !diseases) {
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
          الأمراض
        </Text>
        <SmallCardContainer>
          {diseases?.pages.map((page) =>
            page.diseases.map((disease, i, arr) => {
              return <Disease key={disease.id} disease={disease} />;
            })
          )}
        </SmallCardContainer>
      </View>
    </AutoFetching>
  );
}

const styles = StyleSheet.create({
  plantDiseasesImage: {
    borderTopRightRadius: 10,
    width: "100%",
    height: 110,
    borderTopLeftRadius: 10,
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
        source={disease.imageUrl}
        alt={disease.name}
      />
      <VStack justifyContent='center' alignItems='flex-end' pr={6}>
        <Text textAlign='center' fontSize={"$xs"}  color='#000' pt={6} >
          {disease.species}
        </Text>
        <Text textAlign='center' fontSize={"$sm"} color='#000' fontWeight='700'>
          {disease.name}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};
