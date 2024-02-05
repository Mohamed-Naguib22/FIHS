import React from 'react';
import { StyleSheet, ViewBase } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { View } from '@/components/Themed';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -6 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
  

    <Tabs 
  
      screenOptions={{
        tabBarStyle:{backgroundColor:'#fff',paddingTop:10,paddingBottom:4 ,borderColor:'#fff' ,height:70},
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
    
        name="four"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //         name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'dark'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //           />
          //           )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="leaf" color={color} />,
        }}
        />
        <Tabs.Screen
        
        name="scan"
        
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="barcode" color={color} />,
        }}
        />
      <Tabs.Screen
        name="three"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
        />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
        />

    </Tabs>
       
  );
}
const styles = StyleSheet.create({
  con: {
    flex: 1,
    flexDirection: 'row',
    
    // justifyContent: 'center',
  }})