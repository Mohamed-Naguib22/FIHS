import { StyleSheet } from "react-native";

import TabsPageContainer from "@/components/layout/TabsPageContainer";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { VStack } from "@gluestack-ui/themed";
import FavouriteCard from "@/components/favourites/FavouriteCard";
import { useFavourite } from "../../hooks/useFavourite";
import useSession from "@/hooks/state/useSession";
import Loading from "@/components/layout/Loading";
import { Text, View } from "@gluestack-ui/themed";
export default function FavouritesScreen() {
  const { data: favs, isLoading, refetch } = useFavourite();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <TabsPageContainer refreshAction={refetch}>
      <ScreenHeader name='المفضلة'>
        <VStack gap={"$5"}>
          {favs && favs[0].favPlants?.length > 0 ? (
            favs[0].favPlants.map((fav) => (
              <FavouriteCard
                key={fav.createdAt}
                plant={fav}
                refresh={refetch}
              />
            ))
          ) : (
            <View>
              <Text px={"$2"}>لا يوجد نباتات في المفضلة</Text>
            </View>
          )}
        </VStack>
      </ScreenHeader>
    </TabsPageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
