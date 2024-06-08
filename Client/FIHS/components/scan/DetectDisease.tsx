import React from "react";
import {
  Button,
  ButtonText,
  HStack,
  ScrollView,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";

type Props = {
  disease?: DetectDisease;
  err?: string;
  setDisease: (val?: DetectDisease) => void;
};

const DetectDisease = ({ disease, setDisease, err }: Props) => {
  if (err) {
    return (
      <View flex={1} display='flex' justifyContent='center' alignItems='center'>
        <Text fontSize='$2xl' fontWeight='bold'>
          {err || "الرجاء تصوير نبات حقيقي لتحديد نوع المرض"}
        </Text>
      </View>
    );
  }
  return (
    <ScrollView flex={1} pt={"$10"} px={"$2"}>
      <Text m={10} fontWeight='$normal'>
        <Text fontWeight='$bold' fontSize={"$lg"}>
          صحة النبات :
        </Text>{" "}
        {disease?.isHealthy ? "سليم" : "مريض"}
      </Text>

      <Text m={10} mb={0} fontWeight='900' fontSize={"$lg"}>
        الإمراض المقترحة
      </Text>
      {disease?.suggestions && disease?.suggestions.length > 0 && (
        <VStack mt={"$1"} mb={"$16"} mx={"$2"} gap={"$5"}>
          {disease?.suggestions.map((dis) => {
            return <DiseaseSuggest key={dis.name} dis={dis} />;
          })}
        </VStack>
      )}

      <Button mb={"$16"} onPress={() => setDisease(undefined)}>
        <ButtonText>تحديد مرض اخر</ButtonText>
      </Button>
    </ScrollView>
  );
};

export default DetectDisease;

const DiseaseSuggest = ({ dis }: { dis: DiseaseSuggestion }) => {
  return (
    <VStack gap={"$1"} alignItems='flex-end' bg='#fff' p={"$2"} rounded={"$lg"}>
      <VStack mt={5} gap={6} mb={10}>
        <Text>
          <Text fontWeight='$bold' fontSize={"$lg"}>
            إسم المرض :
          </Text>{" "}
          {dis.name}
        </Text>
        <Text>
          <Text fontWeight='$bold' fontSize={"$lg"}>
            الإسم العلمي :
          </Text>{" "}
          {dis.scientificName}
        </Text>
        <Text>
          <Text fontWeight='$bold' fontSize={"$lg"}>
            الإحتمالية :
          </Text>{" "}
          {dis.probability}
        </Text>
      </VStack>
      <Text fontWeight='$bold' fontSize={"$lg"}>
        الوصف :
      </Text>
      <Text> {dis.description}</Text>
      {dis?.treatment?.prevention && dis?.treatment?.prevention.length > 0 && (
        <VStack my={10}>
          <Text my={10} fontWeight='$bold' fontSize={"$lg"}>
            طرق الوقاية :
          </Text>
          <VStack gap={"$2"} p={"$1"}>
            {dis.treatment.prevention.map((prev) => (
              <Text key={prev}>{prev}</Text>
            ))}
          </VStack>
        </VStack>
      )}
      {dis?.treatment?.biological && dis?.treatment?.biological.length > 0 && (
        <VStack my={10} justifyContent='flex-start'>
          <Text my={10} fontWeight='$bold' fontSize={"$lg"}>
            طرق العلاج البيولوجية :
          </Text>
          <VStack gap={"$2"} p={"$1"}>
            {dis.treatment.biological.map((bio) => (
              <Text key={bio}>{bio}</Text>
            ))}
          </VStack>
        </VStack>
      )}
      {dis?.treatment?.chemical && dis?.treatment?.chemical.length > 0 && (
        <VStack my={10} justifyContent='flex-start'>
          <Text my={10} fontWeight='$bold' fontSize={"$lg"}>
            طرق العلاج الكيميائية :
          </Text>
          <VStack gap={"$2"} p={"$1"}>
            {dis.treatment.chemical.map((chem) => (
              <Text key={chem}>{chem}</Text>
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};
