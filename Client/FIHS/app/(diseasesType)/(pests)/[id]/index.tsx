import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {
  HStack,
  VStack,
  View,
  Text,
  Image,
  ScrollView,
} from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import usePest from "@/hooks/usePest";
import Loading from "@/components/layout/Loading";
import { RelatedPlant } from "@/components/diseases/RelatedPlant";

type Props = {};

const Pest = (props: Props) => {
  const { id } = useLocalSearchParams();
  const navigate = useNavigation();
  const { data: pest, isLoading } = usePest(id as string);
  if (isLoading && !pest) {
    return <Loading />;
  }
  navigate.setOptions({ title: pest?.name });

  return (
    <ScrollView px={"$4"}>
      <Image
        style={styles.articlePhotoId}
        source={pest?.imageUrl}
        alt={pest?.name}
      />
      <VStack>
        <Text fontSize={20} fontWeight='900' color='#000' mr={9} mt={20}>
          {pest?.name}
        </Text>
        <HStack
          justifyContent='flex-end'
          alignItems='center'
          gap={9}
          mt={8}
          pr={5}
        >
          {pest?.scientificName && (
            <Text
              bg='rgba(41, 133, 120,.3)'
              color='#000'
              p={8}
              borderRadius={5}
              textAlign='center'
              fontSize={16}
              fontWeight='600'
            >
              {pest.scientificName}
            </Text>
          )}

          {pest?.species && (
            <Text
              bg='rgba(41, 133, 120,.3)'
              color='#000'
              p={8}
              borderRadius={5}
              textAlign='center'
              fontSize={16}
              fontWeight='600'
            >
              {pest.species}
            </Text>
          )}

          <Text fontWeight='800'>الاسم العلمي للافه</Text>
        </HStack>
        {pest?.description && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              وصف الافه
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
              {pest.description}
            </Text>
          </>
        )}
        {pest?.lifeCycle && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              {" "}
              دوره الحياة
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
              {pest.lifeCycle}
            </Text>
          </>
        )}
        {pest?.damageSymptoms && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              اعراض الافه
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
              {pest.damageSymptoms}
            </Text>
          </>
        )}
        {pest?.controlMethods && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              طرق الوقايه من الافه
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
              {pest.controlMethods}
            </Text>
          </>
        )}

        {pest?.reproduction && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              طرق التكاثر
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
              {pest.reproduction}
            </Text>
          </>
        )}

        {pest?.geographicDistribution && (
          <>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              اماكن الإنتشار
            </Text>
            <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
              {pest.geographicDistribution}
            </Text>
          </>
        )}
        {pest?.plants && pest?.plants.length > 0 && (
          <View>
            <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
              {" "}
              النباتات التي يمكن ان تصاب بهذه الافه
            </Text>
            <ScrollView horizontal style={{ marginBottom: 20 }}>
              {pest.plants.map((plant) => (
                <RelatedPlant key={plant.id} plant={plant} />
              ))}
            </ScrollView>
          </View>
        )}
        {pest?.pesticides && pest?.pesticides.length > 0 && (
          <View>
            <Text fontSize={18} fontWeight='900' color='#000' mr={3}>
              {" "}
              المبيدات الحشرية المناسبة لعلاج هذه الافه
            </Text>
            <ScrollView horizontal style={{ marginBottom: 30 }}>
              {pest.pesticides.map((pesticide) => (
                <RelatedPesticide key={pesticide.id} pesticide={pesticide} />
              ))}
            </ScrollView>
          </View>
        )}
      </VStack>
    </ScrollView>
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

export default Pest;

const RelatedPesticide = ({ pesticide }: { pesticide: Pesticide }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: "transparent",
        borderColor: "rgba(41, 133, 120,0.6)",
        borderWidth: 1,
        borderRadius: 5,
        height: 150,
        width: 150,
        marginRight: 10,
        marginVertical: 10,
      }}
    >
      <Image
        style={styles.similar}
        source={(pesticide as any).imageURL}
        alt={pesticide.name}
      />
      <Text
        textAlign='center'
        color='#000'
        marginRight={5}
        fontWeight='700'
        pt={6}
      >
        {pesticide.name}
      </Text>
    </TouchableOpacity>
  );
};
