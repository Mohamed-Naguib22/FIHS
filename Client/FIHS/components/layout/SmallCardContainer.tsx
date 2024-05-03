import { View, Text } from "react-native";
import React from "react";
import { HStack } from "@gluestack-ui/themed";

type Props = {
  children: React.ReactNode;
};

const SmallCardContainer = ({ children }: Props) => {
  return (
    <HStack flexWrap='wrap' justifyContent='space-between' px={"$3"} gap={15}>
      {children}
    </HStack>
  );
};

export default SmallCardContainer;
