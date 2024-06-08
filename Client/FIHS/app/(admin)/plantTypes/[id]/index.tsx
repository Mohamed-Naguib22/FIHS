import {
  HStack,
  Text,
  VStack,
  View,
  Image,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import Loading from "@/components/layout/Loading";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import AutoFetching from "@/components/layout/AutoFetching";
import { FontAwesome } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DeletePlant } from "@/hooks/usePlant";
import api from "@/utils/api";

export default function AdminAllPlantsInType() {
  const { id } = useLocalSearchParams();
  const navigate = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigate.setOptions({
      title: "كل النباتات ضمن النوع",
    });
  }, []);

  const {
    data: types,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Paginate<Plant, "plant">>({
    queryKey: ["plants-types", id as string],
    queryFn: ({ pageParam }) =>
      api
        .get<Paginate<FullPlant, "plant">>(
          `/Plant/GetAllPlants?plantTypeId=${
            id as string
          }&offset=${pageParam}&limit=${8}`
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
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: "rgba(fff, fff,fff,0.9)",
              borderRadius: 10,
              minHeight: 165,
              minWidth: 150,
              borderColor: "rgba(41, 133, 120,0.4)",
              borderWidth: 1,
              marginVertical: 10,
            }}
            onPress={() => router.push(`/(admin)/plantTypes/${id}/new`)}
          >
            <VStack alignItems='center' justifyContent='center' h={165}>
              <Text>
                <FontAwesome name='plus' size={24} />
              </Text>
              <Text>نبات جديد</Text>
            </VStack>
          </TouchableOpacity>
          {types?.pages?.map((page) =>
            page.plant.length > 0 ? (
              page.plant?.map((plant) => (
                <AdminPlant key={plant.id} plant={plant} />
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
  plantDiseasesImage: {
    width: "100%",
    height: 110,
  },
});
const AdminPlant = ({ plant }: { plant: Plant }) => {
  const router = useRouter();
  const deletePlant = DeletePlant();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: "rgba(fff, fff,fff,0.9)",
        borderRadius: 10,
        minHeight: 165,
        minWidth: 150,
        borderColor: "rgba(41, 133, 120,0.4)",
        borderWidth: 1,
        marginVertical: 10,
      }}
    >
      <Image
        style={styles.plantDiseasesImage}
        source={plant.imageUrl}
        alt={plant.name}
      />
      <VStack justifyContent='center' alignItems='flex-end' pr={6} py={"$1"}>
        <Text fontSize={"$sm"} textAlign='center' color='#000' fontWeight='700'>
          {plant.name}
        </Text>
      </VStack>
      <HStack>
        <Button
          action='primary'
          size='sm'
          borderTopRightRadius={0}
          borderTopLeftRadius={0}
          borderBottomRightRadius={0}
          disabled={true}
        >
          <ButtonText>
            <FontAwesome name='pencil' size={16} />
            تعديل
          </ButtonText>
        </Button>
        <Button
          action='negative'
          size='sm'
          borderTopRightRadius={0}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          onPress={() => deletePlant.mutate({ id: plant.id })}
        >
          <ButtonText>
            <FontAwesome name='trash' size={16} />
            حذف
          </ButtonText>
        </Button>
      </HStack>
    </TouchableOpacity>
  );
};
