import React from "react";
import { Stack } from "expo-router";

type Props = {};

const PlantsLayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        // headerShown:false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='[id]/index' />
      <Stack.Screen name='types/index' />
      <Stack.Screen name='types/[type]/index' />
    </Stack>
  );
};

export default PlantsLayout;
