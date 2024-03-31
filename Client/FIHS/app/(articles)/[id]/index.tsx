import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { HStack, VStack, Text } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import { useRouter } from "expo-router";
import useArticle, { UseLikeArticle } from "../../../hooks/useArticle";
import Loading from "@/components/layout/Loading";
import { Image } from "@gluestack-ui/themed";
import DateConverter from "@/utils/DateConverter";

type Props = {};

const Article = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: article, isLoading } = useArticle(id);
  const router = useRouter();
  const changeLike = UseLikeArticle(id);
  if (isLoading && !article) {
    return <Loading />;
  }
  return (
    <TabsPageContainer>
      <Image style={styles.articlePhotoId} source={{ uri: article?.imgUrl }} />
      <VStack>
        <ScrollView horizontal style={{ marginBottom: 30 }}>
          <HStack justifyContent='flex-end' gap={10} mt={10} mr={5} ml={5}>
            {article?.articleTags.map((tag) => (
              <Tag name={tag.tag} />
            ))}
          </HStack>
        </ScrollView>
        <Text fontSize={20} fontWeight='900' color='#000' mr={9}>
          {article?.title}
        </Text>
        <HStack
          justifyContent='flex-end'
          alignItems='center'
          gap={9}
          mt={8}
          pr={5}
        >
          <VStack>
            <Text>{article?.author}</Text>
            <Text>{DateConverter(article?.publicationDate!)}</Text>
          </VStack>
          <Ionicons
            name='person-circle-outline'
            color='#000'
            style={{ marginTop: 6, marginLeft: 2 }}
            size={40}
          />
        </HStack>
        {article?.articleSections.map((section) => {
          return <Section header={section.title} desc={section.content} />;
        })}
        <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={9}>
          {" "}
          الإعجاب بالمقالة
        </Text>
        <HStack gap={5} px={"$3"} py={"$1.5"}>
          <Text color='$primary400' fontWeight='$bold' size='2xl'>
            {article?.numOfLikes}
          </Text>
          <Text
            color='$primary400'
            pt={"$1.5"}
            onPress={() => changeLike.mutate()}
          >
            <FontAwesome
              name={article?.liked ? "thumbs-up" : "thumbs-o-up"}
              size={24}
            />
          </Text>
        </HStack>
        <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={9}>
          {" "}
          مقالات مشابهه
        </Text>
        <ScrollView horizontal style={{ marginBottom: 30 }}>
          {article?.similarArticles.map((art) => (
            <SimilarArticle art={art} />
          ))}
        </ScrollView>
      </VStack>
    </TabsPageContainer>
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
  similar: {
    width: "100%",
    height: 110,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
});
export default Article;

const Tag = ({ name }: { name: string }) => {
  return (
    <Text
      bg='rgba(41, 133, 120,.3)'
      p={8}
      borderRadius={5}
      textAlign='center'
      fontSize={16}
      fontWeight='600'
    >
      {name}
    </Text>
  );
};

const Section = ({ header, desc }: { header: string; desc: string }) => {
  return (
    <>
      <Text fontSize={18} fontWeight='900' color='#000' mt={20} mr={9}>
        {header}
      </Text>
      <Text fontSize={16} fontWeight='500' color='#000' mt={10} mr={9}>
        {desc}
      </Text>
    </>
  );
};
const SimilarArticle = ({ art }: { art: Article }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: "transparent",
        borderColor: "rgba(41, 133, 120,0.6)",
        borderWidth: 1,
        borderRadius: 5,
        minHeight: 150,
        width: 150,
        marginRight: 10,
      }}
      onPress={() => router.push(`/(articles)/${art.id}`)}
    >
      <Image style={styles.similar} source={art.imgUrl} />
      <Text
        textAlign='center'
        color='#000'
        marginRight={5}
        fontWeight='700'
        pt={6}
      >
        {art.title}
      </Text>
    </TouchableOpacity>
  );
};
