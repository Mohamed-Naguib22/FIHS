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
  plant: IdentifyPlant;
  setPlant: (val: IdentifyPlant | null) => void;
};

const IdentifyPlant = ({ plant: res, setPlant }: Props) => {
  return (
    <ScrollView flex={1} pt={"$10"} px={"$2"}>
      <Text mx={10} fontWeight='900' fontSize={"$lg"}>
        النباتات المقترحة
      </Text>
      <VStack mt={"$5"} mb={"$16"} mx={"$2"} gap={"$5"}>
        {res.suggestions.map((sugg) => {
          return <PlantSuggest key={sugg.imageUrl} sugg={sugg} />;
        })}
      </VStack>
      <Button mb={"$16"} onPress={() => setPlant(null)}>
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
      bg='$backgroundDark200'
      p={"$2"}
      rounded={"$sm"}
    >
      <Image source={{ uri: sugg.imageUrl }} style={styles.Photo} />
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
            عرض المزيد
          </LinkText>
        </Link>
      </VStack>
    </VStack>
  );
};
