import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { HStack, VStack, Text, View } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import useDisease from "@/hooks/useDisease";
import Loading from "@/components/layout/Loading";
import { RelatedPlant } from "@/components/diseases/RelatedPlant";

type Props = {};

const Disease = (props: Props) => {
  const { id } = useLocalSearchParams();
  const { data: disease, isLoading } = useDisease(id as string);
  if (isLoading && !disease) {
    return <Loading />;
  }
  return (
    <TabsPageContainer>
      <Image
        style={styles.articlePhotoId}
        source={{ uri: disease?.imageUrl }}
      />
      <VStack>
        <Text fontSize={20} fontWeight='900' color='#000' mr={9} mt={20}>
          {disease?.name}
        </Text>
        <HStack
          justifyContent='flex-end'
          alignItems='center'
          gap={9}
          mt={8}
          pr={5}
        >
          {disease?.scientificName && (
            <Text
              bg='rgba(41, 133, 120,.3)'
              color='#000'
              p={8}
              borderRadius={5}
              textAlign='center'
              fontSize={16}
              fontWeight='600'
            >
              {disease?.scientificName}
            </Text>
          )}

          {disease?.species && (
            <Text
              bg='rgba(41, 133, 120,.3)'
              color='#000'
              p={8}
              borderRadius={5}
              textAlign='center'
              fontSize={16}
              fontWeight='600'
            >
              {disease?.species}
            </Text>
          )}

          <Text fontWeight='800'>الاسم العلمي للمرض</Text>
        </HStack>
        {disease?.description && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              وصف المرض
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
              {disease.description}
            </Text>
          </>
        )}

        {disease?.symptoms && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              الاعراض
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
              {disease.symptoms}
            </Text>
          </>
        )}
        {disease?.causes && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              {" "}
              الاسباب المسببه للمرض
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
              {disease.causes}
            </Text>
          </>
        )}
        {disease?.preventionMethods && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              طرق الوقايه من المرض
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
              {disease.preventionMethods}
            </Text>
          </>
        )}
        {disease?.treatments && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              طرق العلاج{" "}
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
              {disease.treatments}
            </Text>
          </>
        )}
        <ScrollView horizontal style={{ marginBottom: 30 }}>
          {disease?.plants && disease?.plants.length > 0 && (
            <View>
              <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
                {" "}
                النباتات التي يمكن ان تصاب بهذه الافه
              </Text>
              <ScrollView horizontal style={{ marginBottom: 20 }}>
                {disease.plants.map((plant) => (
                  <RelatedPlant key={plant.id} plant={plant} />
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </VStack>
    </TabsPageContainer>
  );
};
const styles = StyleSheet.create({
  articlePhotoId: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  similar: {
    width: "100%",
    height: 110,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
});

export default Disease;
