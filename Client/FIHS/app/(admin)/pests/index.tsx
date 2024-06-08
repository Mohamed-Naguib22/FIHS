import { Text, VStack, View, Image } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { DeletePest, usePests } from "@/hooks/usePest";
import Loading from "@/components/layout/Loading";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import AutoFetching from "@/components/layout/AutoFetching";
import { HStack } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";

type Props = {};

const Peats = (props: Props) => {
  const navigate = useNavigation();
  useEffect(() => {
    navigate.setOptions({
      title: "كل الأفات",
    });
  }, []);
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
              return <Pest key={pest.id} pest={pest} admin={true} />;
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Peats;

const Pest = ({ pest, admin }: { pest: Pest; admin: boolean }) => {
  const router = useRouter();
  const deletePest = DeletePest();
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
      onPress={() => router.push(`/(diseasesType)/pests/${pest.id}`)}
    >
      <Image
        style={styles.plantDiseasesImage}
        source={pest.imageUrl}
        alt={pest.name}
      />
      <VStack justifyContent='center' alignItems='flex-end' pr={6} py={"$1"}>
        <Text fontSize={"$xs"} textAlign='center' color='#000' pt={6}>
          {pest.species}
        </Text>
        <Text fontSize={"$sm"} textAlign='center' color='#000' fontWeight='700'>
          {pest.name}
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
            onPress={() => router.push(`/(admin)/pests/${pest.id}`)}
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
            onPress={() => deletePest.mutate({ id: pest.id })}
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
