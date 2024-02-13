import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import {  StatusBar,StyleSheet  } from 'react-native';
import { GluestackUIProvider, Button } from '@gluestack-ui/themed';
import { config } from '@/config/gluestack-ui.config';
import { Image } from 'expo-image';
import { View } from '@/components/Themed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}


function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <GluestackUIProvider config={config}>      
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={
            {
              headerShown:false 
        //       headerTitle: ({children, tintColor}) => <Header/>,
        //       headerLeft: () => (
        //         <View>

                    
                      
        //               <Image
        //       style={styles.image}
        //       source={Logo}
        //       placeholder={"blurhash"}
        //       contentFit="cover"
        //       transition={1000}
        //       />
            
        // </View>
            //   ),
            //   headerBackground:()=>(    
            //     <View    style={styles.BG1} >
            //       <Image
            //       style={styles.BG}
            //         source={LogoBG}
            //         placeholder={"blurhash"}
            //         contentFit="cover"
            //         transition={1000}
            //       />
            //     </View>
            //   ),
              
              
            // 
          }} />
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  image: {
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
Hide: {

  },
  
});
