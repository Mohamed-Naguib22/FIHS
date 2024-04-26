import { HStack, Text, VStack, View } from "@gluestack-ui/themed";
import React from "react";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import Section from "@/components/layout/Section";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { usePests } from "@/hooks/usePest";
import Loading from "@/components/layout/Loading";

type Props = {};

const Peats = (props: Props) => {
  const { data: pests, isLoading } = usePests();
  if (isLoading && !pests) {
    return <Loading />;
  }
  return (
    <TabsPageContainer>
      <View>
        <Text fontWeight='700' fontSize={20} pt={9} pb={15} color='#000'>
          {" "}
          الأفات
        </Text>
        {pests?.map((pest, i, arr) => {
          return (
            <HStack justifyContent='space-between' alignItems='center' gap={18}>
              <Pest key={pest.id} pest={pest} />
              {arr[i + 1] && <Pest key={arr[i + 1].id} pest={arr[i + 1]} />}
            </HStack>
          );
        })}
      </View>
    </TabsPageContainer>
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
        source={{ uri: pest.imageUrl }}
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
