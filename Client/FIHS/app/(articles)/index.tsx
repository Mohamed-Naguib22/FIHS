import React, { useEffect, useState } from "react";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import { View, HStack, VStack, Text } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useInfiniteArticles } from "@/hooks/useArticles";
import Loading from "@/components/layout/Loading";
import AutoFetching from "@/components/layout/AutoFetching";

type Props = {};

const Articles = (props: Props) => {
  // const {
  //   data: arts,
  //   isLoading,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfiniteArticles(6);
  // const [show, setShow] = useState(false);
  // useEffect(() => {
  //   if (show) {
  //     fetchNextPage();
  //   }
  // }, [show]);
  // if (isLoading && !arts) {
  //   return <Loading />;
  // }
  const router = useRouter();
  const [isArticle, setIsArticle] = useState(false);


   return <>
   
 <TabsPageContainer>
        <Text
          textAlign='right'
          color='#000'
          fontWeight='900'
          fontSize={20}
          p={6}
          mt={20}
          mb={10}
        >
          المقالات{" "}
        </Text>
        <HStack justifyContent="flex-end" alignItems="center">
          <HStack gap={10} >
            <Text bg='rgba(41, 133, 120,0.6)' p={5} borderRadius={7}  
                                   onPress={()=>setIsArticle(true)}
            >الزراعه
            </Text>
           </HStack>
           <Text>اقرا عن : </Text>
         </HStack>
         {isArticle?
           <VStack
           mt={50} 
           gap={10} 
           >
            <Text
             p={10} borderRadius={7} bg='rgba(41, 133, 120,0.6)'
             onPress={() => router.push(`/(articles)/[id]`)}

             >مقال عن الزراعه والامطار  </Text>
            <Text p={10} borderRadius={7} bg='rgba(41, 133, 120,0.6)'>مقال عن الزراعه والامطار  </Text>

         </VStack>
            :""
        }
       </TabsPageContainer> 
   </> 
// (
//     <AutoFetching
//       hasNextPage={hasNextPage}
//       isFetchingNextPage={isFetchingNextPage}
//       fetchNextPage={fetchNextPage}
//     >
//       <TabsPageContainer>
//         <Text
//           textAlign='right'
//           color='#000'
//           fontWeight='900'
//           fontSize={20}
//           p={6}
//         >
//           المقالات{" "}
//         </Text>
//         <HStack justifyContent="flex-end" >
//           <HStack gap={10} >
//             <Text bg='rgba(41, 133, 120,0.6)' p={5} borderRadius={7}  
//                          onPress={() => router.push(`/(admin)/diseases`)}
// >الزراعه</Text>
//             <Text bg='rgba(41, 133, 120,0.6)' p={5} borderRadius={7}>الزراعه</Text>
            
           
//           </HStack>
//           <Text>اقرا عن : </Text>
//         </HStack>
//         {arts?.pages.map((page) =>
//           page.articles.map((art) => <ArticleRowCard art={art} />)
//         )}
//       </TabsPageContainer>
//      </AutoFetching>
   
//   );


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

// const ArticleRowCard = ({ art }: { art: Article }) => {
//   const router = useRouter();
//   return (
//     <TouchableOpacity
//       onPress={() => router.push(`/(articles)/${art.id}`)}
//       activeOpacity={1}
//     >
//       <View
//         bg='rgba(41, 133, 120,0.6)'
//         borderRadius={"$xl"}
//         borderColor='#000'
//         mb={15}
//         h={250}
//         w={"$full"}
//       >
//         <Image
//           style={styles.articlePhoto}
//           alt={art.title}
//           source={require("@/assets/images/PlantType.jpg")}
//         />
//         <Text
//           textAlign='right'
//           color='#000'
//           marginRight={5}
//           fontWeight='700'
//           pt={6}
//         >
//           {art.title}
//         </Text>
//         <HStack justifyContent='space-between' alignItems='center'>
//           <HStack ml={5} mt={20} alignItems='center'>
//             <Text color='$white' pl={"$2"}>
//               <FontAwesome name='thumbs-up' size={20} />
//             </Text>
//             <Text
//               pt={"$0.5"}
//               px={"$1.5"}
//               color='$white'
//               fontWeight='$bold'
//               size='xl'
//             >
//               {art.numOfLikes}
//             </Text>
//           </HStack>

//           <HStack
//             justifyContent='flex-end'
//             alignItems='center'
//             gap={9}
//             mt={8}
//             pr={5}
//           >
//             <VStack>
//               <Text>{art.author}</Text>
//             </VStack>
//             <Ionicons
//               name='person-circle-outline'
//               color='#000'
//               style={{ marginTop: 6, marginLeft: 2 }}
//               size={40}
//             />
//           </HStack>
//         </HStack>
//       </View>
//     </TouchableOpacity>
//   );
// };
