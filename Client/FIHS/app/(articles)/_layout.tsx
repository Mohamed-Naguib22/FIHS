import React from "react";
import { Stack } from "expo-router";

type Props = {};

const Articleslayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        // headerShown:false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='[id]/index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default Articleslayout;
