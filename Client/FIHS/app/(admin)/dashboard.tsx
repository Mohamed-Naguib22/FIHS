import { View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ButtonText, Button, VStack, Text, HStack } from "@gluestack-ui/themed";
import { AdminPages } from "./_layout";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

type Props = {};

const Dashboard = (props: Props) => {
  const router = useRouter();
  return (
    <VStack gap={"$5"} py={"$4"} p={"$3"}>
      {AdminPages.map((page) => {
        return (
          <VStack key={page.name} gap={"$1"}>
            <Text fontSize={"$lg"} fontWeight='$bold'>
              {page.name}
            </Text>
            <VStack gap={"$1"}>
              <Button
              bg="#fff"

                onPress={() => router.push(`/(admin)/${page.link}` as any)}
                justifyContent='flex-end'
                size='sm'
              >
                <ButtonText>
                  <HStack gap={"$2.5"}>
                    <Text color='#298578' fontWeight='$bold'>
                      {" "}
                      كل {page.name}
                    </Text>
                    <Ionicons name='grid' size={18} color={"#298578"} />
                  </HStack>
                </ButtonText>
              </Button>
              <Button
              bg="#fff"
                onPress={() => router.push(`/(admin)/${page.link}/new` as any)}
                justifyContent='flex-end'
                size='sm'
              >
                <ButtonText>
                  <HStack gap={"$2.5"} alignItems='center'>
                    <Text color='#298578' fontWeight='$bold'>
                      إضافة جديد
                    </Text>
                    <Ionicons name='add-circle' size={18} color={"#298578"} />
                  </HStack>
                </ButtonText>
                <ButtonText></ButtonText>
              </Button>
            </VStack>
          </VStack>
        );
      })}
    </VStack>
  );
};

export default Dashboard;
