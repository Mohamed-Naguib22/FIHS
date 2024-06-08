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
import { useNavigation, useRouter } from "expo-router";
import Loading from "@/components/layout/Loading";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import AutoFetching from "@/components/layout/AutoFetching";
import { FontAwesome } from "@expo/vector-icons";
import { DeletePlantType, usePlantTypes } from "@/hooks/usePlantType";

export default function AdminPlantTypes() {
  const navigate = useNavigation();
  useEffect(() => {
    navigate.setOptions({
      title: "كل انواع النباتات",
    });
  }, []);

  const {
    data: types,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePlantTypes();
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
              return <AdminPlantType key={type.id} type={type} />;
            })
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

const AdminPlantType = ({ type }: { type: PlantType }) => {
  const router = useRouter();
  const deletePlantType = DeletePlantType();
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
      onPress={() => router.push(`/(admin)/plantTypes/${type.id}`)}
    >
      <Image
        style={styles.plantDiseasesImage}
        source={type.imgURL}
        alt={type.name}
      />
      <VStack justifyContent='center' alignItems='flex-end' pr={6} py={"$1"}>
        <Text fontSize={"$sm"} textAlign='center' color='#000' fontWeight='700'>
          {type.name}
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
          onPress={() => deletePlantType.mutate({ id: type.id })}
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
