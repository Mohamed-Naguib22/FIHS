import React from "react";
import { Stack } from "expo-router";

type Props = {};

const Articleslayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='update/index' options={{ headerShown: false }} />
      <Stack.Screen name='settings/index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default Articleslayout;
