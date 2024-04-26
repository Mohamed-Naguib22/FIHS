import React from "react";
import { Stack } from "expo-router";

type Props = {};

const Plantslayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name='scanDisease/index' />
      <Stack.Screen name='scanPlant/index' />
    </Stack>
  );
};

export default Plantslayout;
