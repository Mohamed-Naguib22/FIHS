import React, { useEffect, useState } from "react";
import { Fab, ScrollView, View, RefreshControl,Text } from "@gluestack-ui/themed";
import { useTabHeaderHeight } from "../../hooks/state/useTabHeaderHeight";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";
import { TouchableOpacity ,Switch} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

type Props = {
  children: React.ReactNode;
};

const TabsPageContainer = ({ children }: Props) => {
  const { heightWithoutSearch, heightWithSearch } = useTabHeaderHeight();
  useEffect(() => {
    heightWithSearch();
  }, []);
  const router = useRouter();
  const [showSecondDiv, setShowSecondDiv] = useState(false); 
  const toggleSecondDiv = () => {
    setShowSecondDiv(!showSecondDiv);
  }

  return (
    <RefreshControl
      colors={["#298578"]}
      onRefresh={() => console.log("refresh!")}
      flex={1}
    >
      <ScrollView
        onScrollEndDrag={(e) => {
          e.nativeEvent.contentOffset.y / e.nativeEvent.contentSize.height > 0.1
            ? heightWithoutSearch()
            : heightWithSearch();
        }}
      >
        <ScrollView p={"$4"} flex={1} alignContent='center'>
          {children}
        </ScrollView>
      </ScrollView>
      <Fab
          right={"unset" as any}
          left={"$4"}
          bottom={"$5"} 
          borderRadius={20}
          w={60}
          h={60}
      >
        <Switch
        
        value={showSecondDiv}
        onValueChange={toggleSecondDiv}/>
      </Fab>
      {showSecondDiv && (
        <View style={{ width: 60, height: 130,bottom:60 ,left:16,position:"absolute" ,borderTopStartRadius:20,borderTopEndRadius:20}}>
       <Fab
        onPress={() => router.push("/crop")}
        position='absolute'
        right={"unset" as any}
        left={"$1.5"}
        bottom={"$6"}
        borderRadius={20}
        backgroundColor="#298578"
      >
        <Ionicons name='leaf' size={25} color={"#fff"} />
      </Fab>
       <Fab
        onPress={() => router.push("/chat")}
        position='absolute'
        right={"unset" as any}
        left={"$1.5"}
        bottom={"$20"}
        borderRadius={20}
        backgroundColor="#298578"

      >
        <Fontisto name='reddit' size={25} color={"#fff"} />
      </Fab>
        </View>
      )}

    </RefreshControl>
  );
};

export default TabsPageContainer;
