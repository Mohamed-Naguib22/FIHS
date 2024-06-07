import React from "react";
import { Stack } from "expo-router";

type Props = {};

const DiseasesPestslayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name='pests/index' />
      <Stack.Screen name='pests/[id]/index' />
      <Stack.Screen name='diseases/index' />
      <Stack.Screen name='diseases/[id]/index' />
    </Stack>
  );
};

export default DiseasesPestslayout;
