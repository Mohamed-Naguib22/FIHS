import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';

import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { View } from '@/components/Themed';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import  Logo  from '../../assets/images/Logofinal.png';
import  LogoBG  from '../../assets/images/logoBG.jpg';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
   
    
 
    <Tabs 
      
      screenOptions={{
        headerStyle:{
          height:60
        },
        
        tabBarStyle:{
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
             headerLeft: () => (
                <View>

                {/* <Button
                  onPress={() => alert('This is a button!')}
                  /> */}
                 
                <Image
        style={styles.image}
        source={Logo}
        placeholder={"blurhash"}
        contentFit="cover"
        transition={1000}
        />
       
        </View>
              ),
        headerBackground:()=>(    
          <View    style={styles.BG1} >
            <Image
            style={styles.BG}
              source={LogoBG}
              placeholder={"blurhash"}
              contentFit="cover"
              transition={1000}
            />
          </View>
        ),
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
            left:'48%',
            top:'-50%', 
            transform:'translateX(-30px) translateY(-15px) ',
            zIndex:50,
            width:65,
            height:65,
            elevation:12,
            shadowColor:"#298578",
            backgroundColor:Colors.light.tint,
            borderRadius:20,
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
const styles = StyleSheet.create({
  image: {
    position:"absolute"
    ,
    bottom:"80%",
width:150,
height:70,
backgroundColor:"",
  },
  BG: {
width:500,
height:"100%",
},
BG1: {
  width:"100%",
  height:"100%",
  // transform:"translateY(-20px)",

  },
  
});