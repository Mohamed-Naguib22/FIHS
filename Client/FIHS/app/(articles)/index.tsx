import React, { useEffect, useState } from "react";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import {
  View,
  HStack,
  VStack,
  Text,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import useArticles, { useInfiniteArticles } from "@/hooks/useArticles";
import Loading from "@/components/layout/Loading";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { IOScrollView, InView } from "react-native-intersection-observer";

type Props = {};

const Articles = (props: Props) => {
  const {
    data: arts,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteArticles(6);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) {
      fetchNextPage();
    }
  }, [show]);
  if (isLoading && !arts) {
    return <Loading />;
  }
  return (
    <IOScrollView>
      <TabsPageContainer>
        <Text
          textAlign='right'
          color='#000'
          fontWeight='900'
          fontSize={20}
          p={6}
        >
          المقالات{" "}
        </Text>
        {arts?.pages.map((page) =>
          page.articles.map((art) => <ArticleRowCard art={art} />)
        )}
        {hasNextPage && (
          <InView onChange={(inView: boolean) => setShow(inView)}>
            {isFetchingNextPage && (
              <Button
                w={show ? "$8" : "$32"}
                variant='solid'
                alignSelf='center'
                mt={"auto"}
                rounded={"$md"}
                onPress={() => fetchNextPage()}
              >
                <ButtonSpinner />
              </Button>
            )}
          </InView>
        )}
      </TabsPageContainer>
    </IOScrollView>
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

const ArticleRowCard = ({ art }: { art: Article }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/(articles)/${art.id}`)}
      activeOpacity={1}
    >
      <View
        bg='rgba(41, 133, 120,0.6)'
        borderRadius={"$xl"}
        borderColor='#000'
        mb={15}
        h={250}
        w={"$full"}
      >
        <Image
          style={styles.articlePhoto}
          source={require("@/assets/images/PlantType.jpg")}
        />
        <Text
          textAlign='right'
          color='#000'
          marginRight={5}
          fontWeight='700'
          pt={6}
        >
          {art.title}
        </Text>
        <HStack justifyContent='space-between' alignItems='center'>
          <HStack ml={5} mt={20} alignItems='center'>
            <Text color='$white' pl={"$2"}>
              <FontAwesome name='thumbs-up' size={20} />
            </Text>
            <Text
              pt={"$0.5"}
              px={"$1.5"}
              color='$white'
              fontWeight='$bold'
              size='xl'
            >
              {art.numOfLikes}
            </Text>
          </HStack>

          <HStack
            justifyContent='flex-end'
            alignItems='center'
            gap={9}
            mt={8}
            pr={5}
          >
            <VStack>
              <Text>{art.author}</Text>
            </VStack>
            <Ionicons
              name='person-circle-outline'
              color='#000'
              style={{ marginTop: 6, marginLeft: 2 }}
              size={40}
            />
          </HStack>
        </HStack>
      </View>
    </TouchableOpacity>
  );
};
