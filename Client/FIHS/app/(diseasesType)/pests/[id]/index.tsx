import { StyleSheet } from "react-native";
import React, { useState } from "react";
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
import useComments from "@/hooks/useComment";
import CommentForm from "@/components/comments/CommentForm";
import CommentCard from "@/components/comments/CommentCard";

type Props = {};

const Pest = (props: Props) => {
  const { id } = useLocalSearchParams();
  const navigate = useNavigation();
  const [toBeUpdated, setToBeUpdated] = useState<TComment | null>(null);
  const { data: comments, refetch: refetchComments } = useComments(
    +(id as string),
    "pest"
  );
  const { data: pest, isLoading } = usePest(id as string);
  if (isLoading && !pest) {
    return <Loading />;
  }

  navigate.setOptions({ title: pest?.name });

  return (
    <ScrollView px={"$4"}>
      <Image
        style={styles.articlePhotoId}
        source={{ uri: pest?.imageUrl }}
        alt={pest?.name}
      />
      <VStack mb={16}>
        <Text fontSize={20} fontWeight='900' color='#000' mr={9} mt={20}>
          {pest?.name}
        </Text>
        <Text fontWeight='800' mr={8} mt={5}>الاسم العلمي للافه</Text>
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
      <VStack
        gap={"$3"}
        bg='$backgroundDark200'
        py={"$6"}
        px={"$3"}
        rounded={"$md"}
      >
        <Text fontSize={18} fontWeight='900' color='#000'>
          التعليقات
        </Text>
        <CommentForm
          entityId={+(id as string)}
          entityType='pest'
          toBeUpdated={toBeUpdated}
          setToBeUpdated={setToBeUpdated}
        />
        {comments && comments?.length > 0 ? (
          comments?.map((comment) => {
            return (
              <CommentCard
                key={comment.id}
                comment={comment}
                refetchComments={refetchComments}
                setToBeUpdated={setToBeUpdated}
              />
            );
          })
        ) : (
          <View display='flex' alignItems='center' p={"$10"}>
            <Text>لا توجد تعليقات</Text>
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
    height: 140,
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
