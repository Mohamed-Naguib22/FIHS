import { HStack, Text, VStack, View } from "@gluestack-ui/themed";
import React from "react";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import Section from "@/components/layout/Section";

import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useDiseases } from "@/hooks/useDisease";
import Loading from "@/components/layout/Loading";

export default function Diseases() {
  const router = useRouter();
  const { data: diseases, isLoading } = useDiseases();
  if (isLoading && !diseases) {
    return <Loading />;
  }
  return (
    <TabsPageContainer>
      <View>
        <Text fontWeight='700' fontSize={20} pt={9} pb={15} color='#000'>
          {" "}
          الأمراض
        </Text>
        {diseases?.map((disease, i, arr) => {
          return (
            <HStack
              justifyContent='space-between'
              alignItems='center'
              gap={18}
              px={"$3"}
            >
              <Disease key={disease.id} disease={disease} />
              {arr[i + 1] && (
                <Disease key={arr[i + 1].id} disease={arr[i + 1]} />
              )}
            </HStack>
          );
        })}
      </View>
    </TabsPageContainer>
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
