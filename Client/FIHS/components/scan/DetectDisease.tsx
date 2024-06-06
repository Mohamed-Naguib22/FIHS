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
  disease: DetectDisease;
  setDisease: (val: DetectDisease | null) => void;
};

const DetectDisease = ({ disease, setDisease }: Props) => {
  if (!disease.isPlant) {
    return (
      <View flex={1} display='flex' justifyContent='center' alignItems='center'>
        <Text fontSize='$2xl' fontWeight='bold'>
          الرجاء تصوير نبات حقيقي لتحديد نوع المرض
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
        {disease.isHealthy ? "سليم" : "مريض"}
      </Text>

      <Text m={10} mb={0} fontWeight='900' fontSize={"$lg"}>
        الإمراض المقترحة
      </Text>
      <VStack mt={"$1"} mb={"$16"} mx={"$2"} gap={"$5"}>
        {disease.suggestions.map((dis) => {
          return <DiseaseSuggest key={dis.name} dis={dis} />;
        })}
      </VStack>
      <Button mb={"$16"} onPress={() => setDisease(null)}>
        <ButtonText>تحديد مرض اخر</ButtonText>
      </Button>
    </ScrollView>
  );
};

export default DetectDisease;

const DiseaseSuggest = ({ dis }: { dis: DiseaseSuggestion }) => {
  return (
    <VStack
      gap={"$1"}
      alignItems='flex-start'
      bg='$backgroundDark200'
      p={"$2"}
      rounded={"$sm"}
    >
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
      <Text>
        <Text fontWeight='$bold' fontSize={"$lg"}>
          الوصف :
        </Text>{" "}
        {dis.description}
      </Text>
      {dis?.treatment?.prevention && dis?.treatment?.prevention.length > 0 && (
        <VStack>
          <Text fontWeight='$bold' fontSize={"$lg"}>
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
        <VStack justifyContent='flex-start'>
          <Text fontWeight='$bold' fontSize={"$lg"}>
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
        <VStack justifyContent='flex-start'>
          <Text fontWeight='$bold' fontSize={"$lg"}>
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
