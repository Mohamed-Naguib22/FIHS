import { Button } from "@gluestack-ui/themed";
import {
  Text,
  VStack,
  View,
  Link,
  HStack,
  ButtonText,
  LinkText,
  ScrollView,
} from "@gluestack-ui/themed";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  plant?: IdentifyPlant;
  err?: string;
  setPlant: (val?: IdentifyPlant) => void;
};

const IdentifyPlant = ({ plant: res, setPlant, err }: Props) => {
  if (err) {
    return (
      <View flex={1} display='flex' justifyContent='center' alignItems='center'>
        <Text fontSize='$xl' textAlign='center' fontWeight='bold'>
          {err || "الرجاء تصوير نبات حقيقي لتحديد نوع المرض"}
        </Text>
      </View>
    );
  }
  return (
    <ScrollView flex={1} pt={"$10"} px={"$2"}>
      <Text mx={10} fontWeight='900' fontSize={"$lg"}>
        النباتات المقترحة
      </Text>
      <VStack mt={"$5"} mb={"$16"} mx={"$2"} gap={"$5"}>
        {res?.suggestions.map((sugg) => {
          return <PlantSuggest key={sugg.imageUrl} sugg={sugg} />;
        })}
      </VStack>
      <Button mb={"$16"} onPress={() => setPlant(undefined)}>
        <ButtonText>تحديد نبات اخر</ButtonText>
      </Button>
    </ScrollView>
  );
};

export default IdentifyPlant;

const styles = StyleSheet.create({
  Photo: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

const PlantSuggest = ({ sugg }: { sugg: PlantSuggestion }) => {
  return (
    <VStack
      gap={"$1"}
      alignItems='flex-start'
      bgColor='#fff'
      p={"$2"}
      rounded={"$lg"}
    >
      <Image
        source={{ uri: sugg.imageUrl }}
        style={styles.Photo}
        alt='suggest plant'
      />
      <VStack gap={"$2"} my={"$2"} w={"100%"}>
        <Text>
          <Text fontWeight='$bold' fontSize={"$lg"}>
            الأسماء المعروفة :
          </Text>{" "}
          {Array.isArray(sugg.commonNames)
            ? sugg.commonNames.length > 1
              ? sugg.commonNames.join("، ")
              : sugg.commonNames[0]
            : sugg.commonNames}
        </Text>
        <Text>
          <Text fontWeight='$bold' fontSize={"$lg"}>
            الإسم العلمي :
          </Text>{" "}
          {sugg.scientificName}
        </Text>
        <Text>
          <Text fontWeight='$bold' fontSize={"$lg"}>
            الإحتمالية :
          </Text>{" "}
          {sugg.probability}
        </Text>
        <Text>
          <Text fontWeight='$bold' fontSize={"$lg"}>
            الوصف :
          </Text>{" "}
          {sugg.description}
        </Text>

        <Text>
          <Text fontWeight='$bold' fontSize={"$lg"}>
            إحتمال مؤكد :
          </Text>{" "}
          {sugg.confirmed ? "نعم" : "لا"}
        </Text>
        <Link alignSelf='center' my={"$1"} href={sugg.wikiUrl}>
          <LinkText fontWeight='$bold' fontSize={"$lg"}>
            الاطلاع علي المزيد
          </LinkText>
        </Link>
      </VStack>
    </VStack>
  );
};
