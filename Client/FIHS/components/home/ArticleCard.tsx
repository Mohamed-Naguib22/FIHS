import { Text, VStack } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { useRouter } from "expo-router";
const ArticleCard = () => {
  const router = useRouter();
  return (
    <VStack
      style={{
        width: "100%",
        height: 210,
        borderColor: "#298578",
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        // marginLeft: 2,
        marginTop: 20,
      }}
    >
      <Image
        source={require("@/assets/images/FIHS.article.jpg")}
        style={{
          width: "100%",
          height: 150,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          // marginLeft: -1,
        }}
        alt='articles'
      />
      <Text mr={5} px={8} color='#298578' fontWeight='700' mt={3}>
        يمكنك الاطلاع علي مقالات عن النباتات والامراض وكل ما يخص النباتات
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => router.push(`/articles`)}
      >
        <Text
          p={5}
          bottom={190}
          left={5}
          w={80}
          color='#fff'
          rounded={"$md"}
          bg='rgba(41, 133, 120,0.9)'
          fontWeight='700'
        >
          اضغط هنا
        </Text>
      </TouchableOpacity>
    </VStack>
  );
};

export default ArticleCard;
