import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  HStack,
  VStack,
  View,
  Text,
  ScrollView,
  Image,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import { InboxIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import usePlant from "@/hooks/usePlant";
import Loading from "@/components/layout/Loading";
import { NavigatorProps } from "expo-router/build/views/Navigator";
import { DeleteFavourite, PostFavourite } from "@/hooks/useFavourite";
import useSession from "@/hooks/state/useSession";
import useComments, { UpdateComment } from "@/hooks/useComment";
import CommentCard from "@/components/comments/CommentCard";
import CommentForm from "@/components/comments/CommentForm";
type Props = {};

const Plant = () => {
  const { id } = useLocalSearchParams();
  const navigate = useNavigation();
  const { favouriteId } = useSession();
  const { data: pt, isLoading, refetch } = usePlant(id as string);
  const { data: comments, refetch: refetchComments } = useComments(
    +(id as string),
    "plant"
  );
  const [toBeUpdated, setToBeUpdated] = useState<TComment | null>(null);
  const RemoveFav = DeleteFavourite();
  const addFav = PostFavourite();
  if (isLoading && !pt) {
    return <Loading />;
  }
  const handleRemoveFav = () => {
    RemoveFav.mutate(
      {
        vals: { favouriteId: favouriteId, plantId: pt?.id! },
      },
      {
        onSuccess(data, variables, context) {
          refetch();
        },
      }
    );
  };
  const handleAddFav = () => {
    addFav.mutate(
      { favouriteId: favouriteId, plantId: pt?.id! },
      {
        onSuccess(data, variables, context) {
          refetch();
        },
      }
    );
  };
  navigate.setOptions({ title: pt?.name });
  return (
    <ScrollView px={"$4"}>
      <View position='relative'>
        <Image
          style={styles.articlePhotoId}
          source={pt?.imageUrl}
          alt={pt?.name}
        />
        <Text
          position='absolute'
          left={"$5"}
          top={"$5"}
          bg='$backgroundDark100'
          p={"$2"}
          rounded={"$md"}
          color='$red600'
        >
          <FontAwesome
            size={22}
            name={`heart${pt?.isFav ? "" : "-o"}`}
            onPress={pt?.isFav ? handleRemoveFav : handleAddFav}
          />
        </Text>
      </View>
      <VStack py={"$5"}>
        <ScrollView horizontal style={{ marginBottom: 30 }}>
          <HStack justifyContent='flex-end' gap={10} mt={10} mr={3} ml={5}>
            {pt?.plantTypes.map((type) => (
              <Text
                key={type.id}
                bg='rgba(41, 133, 120,.3)'
                p={8}
                borderRadius={5}
                // textAlign='center'
                fontSize={16}
                
                fontWeight='600'
              >
                {type.name}
              </Text>
            ))}
          </HStack>
        </ScrollView>
        <Text fontSize={20} fontWeight='900' color='#000' mr={3}>
          {pt?.name}
        </Text>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
            وصف النبات
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
            {pt?.description}
          </Text>
        </VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={10} mr={3}>
            خصائص النبات 
          </Text>

        <HStack
          justifyContent='space-evenly'
          alignItems='center'
          gap={9}
          mt={8}
          pr={5}
          borderColor="rgba(41, 133, 120,.3)"
          borderWidth={1}
          bg="#fff"
          rounded={"$md"}
          p={10}
        >
          <VStack justifyContent='center' alignItems='center'>
            <View
              w={40}
              h={40}
              borderRadius={5}
              justifyContent='center'
              alignItems='center'
              bg='$rgba(41, 133, 120,0.6)'
            >
              <Ionicons name='sunny-outline' size={25} />
            </View>

            <Text>الضوء</Text>
            <Text size='xs'>{pt?.sunlightReqs}</Text>
          </VStack>
          <VStack justifyContent='center' alignItems='center'>
            <View
              w={40}
              h={40}
              borderRadius={5}
              justifyContent='center'
              alignItems='center'
              bg='$rgba(41, 133, 120,0.6)'
            >
              <Ionicons name='thermometer-outline' size={25} />
            </View>

            <Text>الحرارة</Text>
            <Text size='xs'>{pt?.temperature}</Text>
          </VStack>
          <VStack justifyContent='center' alignItems='center'>
            <View
              w={40}
              h={40}
              borderRadius={5}
              justifyContent='center'
              alignItems='center'
              bg='$rgba(41, 133, 120,0.6)'
            >
              <Ionicons name='water-outline' size={25} />
            </View>

            <Text>الماء</Text>
            <Text size='xs'>{pt?.averageYield}</Text>
          </VStack>
          <VStack justifyContent='center' alignItems='center'>
            <View
              w={40}
              h={40}
              borderRadius={5}
              justifyContent='center'
              alignItems='center'
              bg='$rgba(41, 133, 120,0.6)'
            >
              <Ionicons name='color-palette-outline' size={25} />
            </View>

            <Text>اللون </Text>
            <Text size='xs'>{pt?.color}</Text>
          </VStack>
        </HStack>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
            مواسم الزراعه والحصاد
            {" "}
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
            {pt?.plantingSeason} - {pt?.harvistingSeason}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
            الاسمده
            {" "}
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
            سماد عضوي
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
            نوع التربه{" "}
            {" "}
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
            {pt?.soils.map((soil) => soil.texture).join("، ")}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
            القيمه الغذائيه
            {" "}
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
            {pt?.nutritionalValue}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={3}>
            الاستخدامات
            {" "}
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={3}>
            {pt?.commonUses}
          </Text>
        </VStack>
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
          entityType='plant'
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
          <View>
            <Text textAlign="center">لا توجد تعليقات</Text>
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
    marginTop:8,
    // borderTopEndRadius:10,
    // borderTopStartRadius:10,
    borderRadius: 10,
  },
  similarArticles: {
    width: "100%",
    height: 110,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  PlantsTypesImage: {
    width: "100%",
    height: 140,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});
export default Plant;
