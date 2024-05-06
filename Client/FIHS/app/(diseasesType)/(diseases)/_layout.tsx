import React from "react";
import { Stack } from "expo-router";

type Props = {};

const Diseaseslayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='[id]/index' />
    </Stack>
  );
};

export default Diseaseslayout;
