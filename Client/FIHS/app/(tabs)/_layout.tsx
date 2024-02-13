import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import TabsHeader from '@/components/layout/TabsHeader';
import { Feather } from '@expo/vector-icons';
import { useTabHeaderHeight } from '@/components/layout/useTabHeaderHeight';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText, Button, ButtonText, HStack, VStack } from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import { RNCamera } from 'react-native-camera';
import Scan from '@/components/home/Scan';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} {...props}/>;
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
    <Tabs       
      screenOptions={{   
        tabBarStyle:{
          flexDirection:'row-reverse',
          backgroundColor:'#fff',
          paddingTop:10,
          paddingBottom:4,
          borderColor:'rgba(41, 133, 120,0.4)',
          height:70,
          shadowColor: "rgb(41, 133, 120)",
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.6,
          shadowRadius: 4,
          borderTopEndRadius:20,
          borderTopStartRadius:20,
          position:'relative',
          display:'flex'
        },
        header:({layout, navigation, options, route})=><TabsHeader/>,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
        <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
        />
      <Tabs.Screen
        name="three"
        options={{
          title: '',
          tabBarItemStyle:{
            marginRight:25
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
        />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarItemStyle:{
            position:'absolute',
            right:'50%',
            top:'-50%', 
            transform:'translateX(-32.5px) translateY(-15px) ',
            zIndex:50,
            width:65,
            height:65,
            elevation:12,
            shadowColor:"#298578",
            backgroundColor:Colors.light.tint,
            borderRadius:20,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
          },
          tabBarIconStyle:{
          width:"100%",
          height:"100%"
          },
          tabBarIcon: ({ color }) =><Scan/>,
        }}
      />     
      <Tabs.Screen
        name="two"
        options={{
          title: '',
          tabBarItemStyle:{
            marginLeft:40
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="leaf" color={color} />,
        }}
        />
      <Tabs.Screen
        name="four"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}