import React from "react";
import { Stack } from "expo-router";

type Props = {};
export const AdminPages: { link: string; name: string }[] = [
  { link: "pests", name: "الافات" },
  { link: "pesticides", name: "المبيدات" },
  { link: "fertilizers", name: "الاسمدة" },
  { link: "diseases", name: "الامراض" },
  // { link: "plants", name: "النبات" },
];
const AdminLayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        // headerShown:false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name='dashboard' options={{ title: "لوحة التحكم" }} />
      {AdminPages.map((page) => (
        <Stack.Screen
          key={page.name + Math.random()}
          name={`${page.link}/[id]/index`}
        />
      ))}
      {AdminPages.map((page) => (
        <Stack.Screen
          key={page.name + Math.random()}
          name={`${page.link}/new`}
        />
      ))}
      {AdminPages.map((page) => (
        <Stack.Screen
          key={page.name + Math.random()}
          name={`${page.link}/index`}
        />
      ))}
      <Stack.Screen name='articles/index' />
      <Stack.Screen name='articles/new' />
    </Stack>
  );
};

export default AdminLayout;
