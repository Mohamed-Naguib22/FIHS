import React from "react";
import { Text, View, Image } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLocalSearchParams, useRouter } from "expo-router";
import Loading from "@/components/layout/Loading";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import AutoFetching from "@/components/layout/AutoFetching";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { RelatedPlant } from "@/components/diseases/RelatedPlant";

export default function UserPlantTypeAllPlants() {
  const { type } = useLocalSearchParams();
  const {
    data: types,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Paginate<Plant, "plant">>({
    queryKey: ["plants-types", type],
    queryFn: ({ pageParam }) =>
      api
        .get<Paginate<FullPlant, "plant">>(
          `/Plant/GetAllPlants?plantTypeId=${type}&offset=${pageParam}&limit=${8}`
        )
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage > 0 ? lastPage.nextPage : null,
  });

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
          كل النباتات
        </Text>
        <SmallCardContainer>
          {types?.pages?.map((page) =>
            page.plant.length > 0 ? (
              page.plant?.map((plant) => (
                <RelatedPlant key={plant.id} plant={plant} />
              ))
            ) : (
              <Text key={page.nextPage}>لا توجد نباتات</Text>
            )
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
