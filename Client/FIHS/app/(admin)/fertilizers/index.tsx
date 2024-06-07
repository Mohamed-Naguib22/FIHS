import {
  HStack,
  Text,
  VStack,
  View,
  Image,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Loading from "@/components/layout/Loading";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import AutoFetching from "@/components/layout/AutoFetching";
import { FontAwesome } from "@expo/vector-icons";
import { DeleteFertilizer, useFertilizers } from "@/hooks/useFertilizer";

export default function AdminFertilizers() {
  const {
    data: fertilizers,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFertilizers();
  if (isLoading && !fertilizers) {
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
          الاسمدة
        </Text>
        <SmallCardContainer>
          {fertilizers?.pages.map((page) =>
            page.fertilizers.map((fertilizer) => {
              return (
                <AdminFertilizer
                  key={fertilizer.id}
                  fertilizer={fertilizer}
                  admin={true}
                />
              );
            })
          )}
        </SmallCardContainer>
      </View>
    </AutoFetching>
  );
}

const styles = StyleSheet.create({
  plantFertilizersImage: {
    width: "100%",
    height: 110,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

const AdminFertilizer = ({
  fertilizer,
  admin,
}: {
  fertilizer: Fertilizer;
  admin: boolean;
}) => {
  const router = useRouter();
  const deleteFertilizer = DeleteFertilizer();
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
      // onPress={() => router.push(`/fertilizers/${fertilizer.id}`)}
    >
      <Image
        style={styles.plantFertilizersImage}
        source={fertilizer.imageURL}
        alt={fertilizer.name}
      />
      <VStack justifyContent='center' alignItems='flex-end' pr={6} py={"$1"}>
        <Text fontSize={"$xs"} textAlign='center' color='#000' pt={6}>
          {fertilizer.manufactuer}
        </Text>
        <Text fontSize={"$sm"} textAlign='center' color='#000' fontWeight='700'>
          {fertilizer.name}
        </Text>
      </VStack>
      {admin && (
        <HStack>
          <Button
            action='primary'
            size='sm'
            borderTopRightRadius={0}
            borderTopLeftRadius={0}
            borderBottomRightRadius={0}
            onPress={() => router.push(`/(admin)/fertilizers/${fertilizer.id}`)}
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
            onPress={() => deleteFertilizer.mutate({ id: fertilizer.id })}
          >
            <ButtonText>
              <FontAwesome name='trash' size={16} />
              حذف
            </ButtonText>
          </Button>
        </HStack>
      )}
    </TouchableOpacity>
  );
};
