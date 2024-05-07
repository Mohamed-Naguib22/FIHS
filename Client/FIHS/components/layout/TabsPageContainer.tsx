import React, { useEffect } from "react";
import { Fab, ScrollView, View, RefreshControl } from "@gluestack-ui/themed";
import { useTabHeaderHeight } from "../../hooks/state/useTabHeaderHeight";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";

type Props = {
  children: React.ReactNode;
};

const TabsPageContainer = ({ children }: Props) => {
  const { heightWithoutSearch, heightWithSearch } = useTabHeaderHeight();
  useEffect(() => {
    heightWithSearch();
  }, []);
  const router = useRouter();
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
        onPress={() => router.push("/chat")}
        position='absolute'
        right={"unset" as any}
        left={"$4"}
        bottom={"$5"}
      >
        <Fontisto name='reddit' size={32} color={"white"} />
      </Fab>
    </RefreshControl>
  );
};

export default TabsPageContainer;
