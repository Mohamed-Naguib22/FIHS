import React from "react";
import { HStack, ScrollView, Text, View } from "@gluestack-ui/themed";

type Props = {
  name: string;
  children: React.ReactNode;
};

const ScreenHeader = ({ name, children }: Props) => {
  return (
    <View my={"$5"}>
      <HStack justifyContent='flex-end' alignItems='center' my={"$3"}>
        <Text fontWeight='$bold' size='2xl' px={"$0"}>
          {" "}
          {name}
        </Text>
      </HStack>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default ScreenHeader;
