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
import { DeletePesticide, usePesticides } from "@/hooks/usePesticide";

export default function AdminPesticides() {
  const {
    data: pesticides,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePesticides();
  if (isLoading && !pesticides) {
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
          {pesticides?.pages.map((page) =>
            page.pesticides.map((pesticide) => {
              return (
                <AdminPesticide
                  key={pesticide.id}
                  pesticide={pesticide}
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

const AdminPesticide = ({
  pesticide,
  admin,
}: {
  pesticide: Pesticide;
  admin: boolean;
}) => {
  const router = useRouter();
  const deletePesticide = DeletePesticide();
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
        style={styles.plantFertilizersImage}
        source={pesticide.imageURL}
        alt={pesticide.name}
      />
      <VStack justifyContent='center' alignItems='flex-end' pr={6} py={"$1"}>
        <Text fontSize={"$xs"} textAlign='center' color='#000' pt={6}>
          {pesticide.type}
        </Text>
        <Text fontSize={"$sm"} textAlign='center' color='#000' fontWeight='700'>
          {pesticide.name}
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
            onPress={() => router.push(`/(admin)/pesticides/${pesticide.id}`)}
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
            onPress={() => deletePesticide.mutate({ id: pesticide.id })}
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
