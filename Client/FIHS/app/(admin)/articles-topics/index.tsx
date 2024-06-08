import React, { useEffect } from "react";
import { DeleteTopic, useTopics } from "@/hooks/useArticles";
import Loading from "@/components/layout/Loading";
import { Button, ButtonText, HStack, VStack, View } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

type Props = {};

const AdminAllTopics = (props: Props) => {
  const { data: topics, isLoading } = useTopics();
  const navigate = useNavigation();

  useEffect(() => {
    navigate.setOptions({
      title: "كل المواضيع",
    });
  }, []);
  const deleteTopic = DeleteTopic();
  if (isLoading && !topics) {
    return <Loading />;
  }
  return (
    <View py={"$6"} px={"$2"}>
      <Text mt={10} mb={10} mx={10} fontWeight='900' fontSize={"$lg"}>
        مواضيع المقالات
      </Text>
      <VStack gap={"$3"}>
        {topics?.map(({ id, name }) => (
          <HStack key={id} justifyContent='space-between' alignItems='center'>
            <Text>{name}</Text>
            <Button
              action='negative'
              onPress={() => deleteTopic.mutate({ id })}
            >
              <ButtonText>
                <FontAwesome name='trash' size={24} />
              </ButtonText>
            </Button>
          </HStack>
        ))}
      </VStack>
    </View>
  );
};

export default AdminAllTopics;
