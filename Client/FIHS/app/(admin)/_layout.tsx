import React from "react";
import { Stack } from "expo-router";

type Props = {};

const AdminLayout = (props: Props) => {
  const pages = ["plants", "diseases", "fertilizers", "pesticides", "pests"];
  return (
    <Stack
      screenOptions={{
        // headerShown:false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name='dashboard' />
      {pages.map((page) => (
        <>
          <Stack.Screen name={`${page}/[id]/index`} /> {/*update*/}
          <Stack.Screen name={`${page}/new`} />
          {/*post*/}
          <Stack.Screen name={`${page}/index`} />
          {/*get*/}
        </>
      ))}
    </Stack>
  );
};

export default AdminLayout;
