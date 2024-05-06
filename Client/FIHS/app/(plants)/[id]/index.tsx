import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { HStack, VStack, View, Text, ScrollView } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import { InboxIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import usePlant from "@/hooks/usePlant";
import Loading from "@/components/layout/Loading";
import { NavigatorProps } from "expo-router/build/views/Navigator";
type Props = {};

const Plant = () => {
  const { id } = useLocalSearchParams();
  const navigate = useNavigation();
  const { data: pt, isLoading } = usePlant(id as string);

  if (isLoading && !pt) {
    return <Loading />;
  }
  navigate.setOptions({ title: pt?.name });
  return (
    <ScrollView px={"$5"}>
      <View>
        <Image
          style={styles.articlePhotoId}
          source={require("@/assets/images/PlantType.jpg")}
        />
      </View>
      <VStack py={"$5"}>
        <ScrollView horizontal style={{ marginBottom: 30 }}>
          <HStack justifyContent='flex-end' gap={10} mt={10} mr={5} ml={5}>
            {pt?.plantTypes.map((type) => (
              <Text
                key={type.id}
                bg='rgba(41, 133, 120,.3)'
                p={8}
                borderRadius={5}
                textAlign='center'
                fontSize={16}
                fontWeight='600'
              >
                {type.name}
              </Text>
            ))}
          </HStack>
        </ScrollView>
        <Text fontSize={20} fontWeight='900' color='#000' mr={9}>
          {pt?.name}
        </Text>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={9}>
            وصف النبات
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
            {pt?.description}
          </Text>
        </VStack>
        <HStack
          justifyContent='space-evenly'
          alignItems='center'
          gap={9}
          mt={8}
          pr={5}
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

            <Text>الجراره</Text>
            <Text size='xs'>18c</Text>
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
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={9}>
            {" "}
            مواسم الزراعه والحصاد
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
            {pt?.plantingSeason} - {pt?.harvistingSeason}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={9}>
            {" "}
            الاسمده
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
            سماد عضوي
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={9}>
            {" "}
            نوع التربه{" "}
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
            {pt?.soils.map((soil) => soil.texture).join("، ")}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={9}>
            {" "}
            القيمه الغذائيه
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
            {pt?.nutritionalValue}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={9}>
            {" "}
            الاستخدامات
          </Text>
          <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
            {pt?.commonUses}
          </Text>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  articlePhotoId: {
    width: "100%",
    height: 200,
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
