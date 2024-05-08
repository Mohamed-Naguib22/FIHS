import React, { useEffect, useState } from "react";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import {
  View,
  HStack,
  VStack,
  Text,
  Button,
  ButtonText,
  ScrollView,
  Link,
  LinkText,
} from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import Loading from "@/components/layout/Loading";
import AutoFetching from "@/components/layout/AutoFetching";
import useArticles, { useTopics } from "@/hooks/useArticles";

type Props = {};

const Articles = (props: Props) => {
  const [isArtsLoading, setIsArtsLoading] = useState(false);
  const [articles, setArticles] = useState<ArticleCard[] | undefined>(
    undefined
  );
  const { data: topics, isLoading } = useTopics();
  const getArticles = useArticles();
  if (isLoading || isArtsLoading) {
    return <Loading />;
  }
  return (
    <View flex={1} px={"$2"} pt={"$6"} display='flex' alignItems='center'>
      <Text
        textAlign='right'
        color='#000'
        fontWeight='900'
        fontSize={20}
        p={6}
        mt={20}
        mb={10}
        alignSelf='flex-start'
      >
        المقالات{" "}
      </Text>
      <HStack justifyContent='flex-end' mb={"$2"} alignItems='flex-start'>
        <HStack gap={10} flexWrap='wrap'>
          {topics?.map((topic) => (
            <Text
              key={topic.id}
              bg='rgba(41, 133, 120,0.6)'
              p={5}
              borderRadius={7}
              onPress={() => {
                setIsArtsLoading(true);
                getArticles.mutateAsync(
                  { topic: topic.name!, amount: 10 },
                  {
                    onSuccess(data, variables, context) {
                      setArticles(data);
                      setIsArtsLoading(false);
                    },
                  }
                );
              }}
            >
              {topic.name}
            </Text>
          ))}
        </HStack>
        <Text p={5} fontWeight='bold' fontSize={"$md"}>
          إقرأ عن :{" "}
        </Text>
      </HStack>
      <ScrollView>
        <VStack my={"$3"} gap={10} alignSelf='flex-start'>
          {articles && articles?.length > 0 ? (
            articles.map((art) => {
              return (
                <HStack
                  bg='$backgroundDark200'
                  p={"$2"}
                  w={375}
                  rounded={"$md"}
                  key={art.position}
                >
                  <VStack gap={"$2"}>
                    <Text fontWeight='$bold'>{art.title}</Text>
                    <Text fontSize={"$xs"}>{art.snippet}</Text>
                    <HStack alignSelf='center' gap={"$5"}>
                      {art.snippet && (
                        <Link href={art.resourceLink} alignSelf='center'>
                          <LinkText>
                            <FontAwesome name='file-pdf-o' size={20} />
                          </LinkText>
                        </Link>
                      )}
                      <Link href={art.link} alignSelf='center'>
                        <LinkText>قراءة المقالة</LinkText>
                      </Link>
                    </HStack>
                  </VStack>
                </HStack>
              );
            })
          ) : (
            <View>
              <Text>إختار موضوع لعرض مقالاته</Text>
            </View>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default Articles;
const styles = StyleSheet.create({
  articlePhoto: {
    width: "100%",
    height: 160,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});
