import {
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

import { motify } from "moti";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRouter } from "expo-router";

const ArticleCard = () => {
  // const Mui = motify(View)();
  // const tapGesture = Gesture.LongPress().onStart(() => {
  //   // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  // });
  const router = useRouter();

  return (
    // <GestureDetector gesture={tapGesture}>
    //   <Mui
    //     minHeight={"$72"}
    //     maxHeight={"$96"}
    //     w={"$64"}
    //     h={"$80"}
    //     m={"$1.5"}
    //     bg='rgba(58, 171, 117,.3)'
    //     rounded={20}
    //   >
    //     <VStack>
    //       <View h={"$1/2"} position='relative'>
    //         <Image
    //           style={{
    //             width: "100%",
    //             height: 150,
    //             borderTopRightRadius: 20,
    //             borderTopLeftRadius: 20,
    //           }}
    //           source={imgUrl}
    //           alt={title}
    //         />
    //         <View
    //           position='absolute'
    //           bg='rgba(58, 171, 117,.75)'
    //           p={"$1.5"}
    //           right={0}
    //           top={0}
    //           style={{ borderTopRightRadius: 20, borderBottomLeftRadius: 5 }}
    //         >
    //           <HStack alignItems='center' justifyContent='space-between'>
    //             <Text
    //               pt={"$0.5"}
    //               px={"$1.5"}
    //               color='$white'
    //               fontWeight='$bold'
    //               size='xs'
    //             >
    //               {numOfLikes}
    //             </Text>
    //             <Text color='$white' pt={"$0"}>
    //               <FontAwesome name='thumbs-up' size={12} />
    //             </Text>
    //           </HStack>
    //         </View>
    //       </View>
    //       <HStack
    //         alignItems='center'
    //         justifyContent='space-between'
    //         pt={"$1.5"}
    //         px={"$1.5"}
    //       >
    //         <HStack alignItems='center' justifyContent='space-between'>
    //           <Text color='$textDark600' pt={"$0"}>
    //             <Fontisto name='person' size={12} />
    //           </Text>
    //           <Text
    //             pt={"$0.5"}
    //             px={"$1.5"}
    //             color='$textDark600'
    //             fontWeight='$bold'
    //             size='xs'
    //           >
    //             {author}
    //           </Text>
    //         </HStack>
    //       </HStack>
    //       <HStack alignItems='center' justifyContent='space-between'>
    //         <Text
    //           pt={"$0.5"}
    //           px={"$1.5"}
    //           fontWeight='$extrabold'
    //           size='lg'
    //           color='$textDark900'
    //         >
    //           {title}
    //         </Text>
    //       </HStack>
    //       <Text
    //         px={"$1.5"}
    //         color='$textDark600'
    //         size={"xs"}
    //         pt={"$0.5"}
    //         numberOfLines={1}
    //       >
    //         {overview}
    //       </Text>
    //       <Button
    //         w={"$32"}
    //         variant='solid'
    //         alignSelf='center'
    //         mt={"auto"}
    //         rounded={"$md"}
    //         onPress={() => router.push(`/(articles)/${id}`)}
    //       >
    //         <ButtonText size='sm'>متابعة القراءة</ButtonText>
    //       </Button>
    //     </VStack>
    //   </Mui>
    // </GestureDetector>
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.push(`/(articles)/`)}
      style={{
        width: "100%",
        height: 100,
        borderRadius: 10,
        marginLeft: -1,
        marginTop: 20,
      }}
    >
      <Image
        source={require("@/assets/images/article.png")}
        style={{
          width: "99%",
          height: 100,

          borderRadius: 10,
          marginLeft: -1,
        }}
      />
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#Fff",
//     flexDirection: "column",
//     gap: 40,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     backgroundColor: "#000",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
//   WeatherContainer: {
//     width: "90%",
//     // height:"2%",
//     padding: 10,
//     margin: "auto",
//     // position:"absolute",
//     // top:"5%",
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     // marginBottom:30
//   },
//   WeatherIcon: {
//     // bottom:"40%",
//     // left:"50%",
//   },

//   WeatherContentLeft: {
//     backgroundColor: "transparent",
//   },
//   WeatherContentRight: {
//     backgroundColor: "transparent",
//   },
//   WeatherNum: {
//     fontSize: 70,
//   },
//   center: {
//     textAlign: "center",
//     fontSize: 20,
//   },
//   articlesViewName: {
//     width: "90%",
//     backgroundColor: "transparent",
//     flex: 1,
//     // alignItems: 'center',
//     justifyContent: "space-between",
//     flexDirection: "row-reverse",
//     // top:"30%",
//     // position:"absolute",
//   },
//   articlesName: {
//     color: "#000",
//     fontWeight: "800",
//     backgroundColor: "transparent",
//     // marginTop:50
//     padding: 0,
//   },
//   articlesMore: {
//     color: "#004CCB",
//     backgroundColor: "transparent",
//     // marginTop:50
//     padding: 0,
//   },
//   articlesHeader: {
//     textAlign: "right",
//     fontSize: 18,
//     marginEnd: 2,
//     marginTop: 3,
//     marginBottom: 2,
//     color: "#000",
//     fontWeight: "900",
//   },
//   articlesContent: {
//     textAlign: "right",
//     fontSize: 12,
//     marginEnd: 10,
//     marginTop: 2,
//     color: "#969696",
//     fontWeight: "bold",
//   },
//   articlesScrollView: {
//     width: "100%",
//     direction: "rtl",
//   },
//   articles: {
//     width: 180,
//     height: "48%",
//     marginLeft: 20,
//     borderRadius: 20,
//     backgroundColor: "rgba(58, 171, 117,.3)",
//   },
//   articlesImage: {
//     width: "100%",
//     height: "100%",
//     borderTopEndRadius: 20,
//     borderTopStartRadius: 20,
//     objectFit: "cover",
//   },
// });

export default ArticleCard;
