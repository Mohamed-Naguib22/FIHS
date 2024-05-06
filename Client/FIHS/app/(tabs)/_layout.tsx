import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useSegments } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import TabsHeader from "@/components/layout/TabsHeader";
import { RNCamera } from "react-native-camera";
import Scan from "@/components/home/Scan";
import { Avatar, AvatarFallbackText, AvatarImage } from "@gluestack-ui/themed";
import useSession from "@/hooks/state/useSession";
import { View } from "@/components/Themed";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { imgUrl } = useSession();
  const segments = useSegments();
  return (
    <Tabs
      initialRouteName='home/index'
      tabBar={segments[1] === "(scan)" ? () => <View /> : undefined}
      screenOptions={{
        tabBarStyle: {
          flexDirection: "row-reverse",
          backgroundColor: "#fff",
          paddingTop: 10,
          paddingBottom: 4,
          borderColor: "rgba(41, 133, 120,0.4)",
          height: 70,
          shadowColor: "rgb(41, 133, 120)",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.6,
          shadowRadius: 4,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          position: "relative",
          display: "flex",
        },
        header:
          segments[1] === "(scan)"
            ? () => <View />
            : ({ layout, navigation, options, route }) => <TabsHeader />,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name='home/index'
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='diseases/index'
        options={{
          title: "",
          tabBarItemStyle: {
            marginRight: 25,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name='leaf' color={color} />,
        }}
      />
      <Tabs.Screen
        name='(scan)'
        options={{
          title: "",
          tabBarItemStyle: {
            position: "absolute",
            right: "50%",
            top: "-50%",
            transform: "translateX(32.5px) translateY(-15px) ",
            zIndex: 50,
            width: 65,
            height: 65,
            elevation: 12,
            shadowColor: "#298578",
            backgroundColor: Colors.light.tint,
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarIconStyle: {
            width: "100%",
            height: "100%",
          },
          tabBarIcon: ({ color }) => <Scan />,
        }}
      />
      <Tabs.Screen
        name='favourites/index'
        options={{
          title: "",
          tabBarItemStyle: {
            marginLeft: 40,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name='heart' color={color} />,
        }}
      />
      <Tabs.Screen
        name='profile/index'
        options={{
          title: "",
          tabBarIcon: ({ color }) =>
            imgUrl && (
              <Avatar
                borderColor={color}
                borderWidth={"$2"}
                size='sm'
                alignSelf='center'
              >
                <AvatarFallbackText></AvatarFallbackText>
                <AvatarImage alt='يوسف محمد' source={imgUrl} />
              </Avatar>
            ),
        }}
      />
    </Tabs>
  );
}
