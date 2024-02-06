import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
  

    <Tabs 
  
      screenOptions={{
        tabBarStyle:{
          backgroundColor:'#fff',
          paddingTop:10,
          paddingBottom:4,
          borderColor:'#fff',
          height:70,
            shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
          position:'relative',
          display:'flex'
        },
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
          tabBarItemStyle:{
            marginRight:25
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="leaf" color={color} />,
        }}
        />
        <Tabs.Screen
        
        name="scan"
        
        options={{
          title: '',
          tabBarItemStyle:{
            position:'absolute',
            left:'50%',
            top:'-50%',
            transform:'translateX(-30px) translateY(-15px)',
            zIndex:50,
            width:60,
            height:60,
            backgroundColor:Colors.light.tint,
            borderRadius:45,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          },
          tabBarIconStyle:{
          marginTop:15
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="barcode" color={"white"} />,
        }}
        />
      <Tabs.Screen
        name="three"
        options={{
          title: '',
          tabBarItemStyle:{
            marginLeft:25
          },
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