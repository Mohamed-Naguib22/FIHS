import { Text, VStack, View, Image } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { usePests } from "@/hooks/usePest";
import Loading from "@/components/layout/Loading";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import AutoFetching from "@/components/layout/AutoFetching";

type Props = {};

const Peats = (props: Props) => {
  const {
    data: pests,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePests();
  if (isLoading && !pests) {
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
          الأفات
        </Text>
        <SmallCardContainer>
          {pests?.pages.map((page) =>
            page.pests.map((pest, i, arr) => {
              return <Pest key={pest.id} pest={pest} />;
            })
          )}
        </SmallCardContainer>
      </View>
    </AutoFetching>
  );
};

const styles = StyleSheet.create({
  plantDiseasesImage: {
    width: "100%",
    height: 110,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

export default Peats;

const Pest = ({ pest }: { pest: Pest }) => {
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
      onPress={() => router.push(`/(diseasesType)/(pests)/${pest.id}`)}
    >
      <Image
        style={styles.plantDiseasesImage}
        source={pest.imageUrl}
        alt={pest.name}
      />
      <VStack justifyContent='center' alignItems='flex-end' pr={6}>
        <Text textAlign='center' color='#000' pt={6}>
          {pest.species}
        </Text>
        <Text textAlign='center' color='#000' fontWeight='700'>
          {pest.name}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};
