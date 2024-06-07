import React from "react";
import { Stack } from "expo-router";

type Props = {};

const PlantsLayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
      initialRouteName='types/index'
    >
      <Stack.Screen name='[id]/index' />
      <Stack.Screen name='types/index' options={{ headerShown: false }} />
      <Stack.Screen
        name='types/[type]/index'
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default PlantsLayout;
