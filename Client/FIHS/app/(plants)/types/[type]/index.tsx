import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import Loading from "@/components/layout/Loading";
import { usePlants } from "@/hooks/usePlant";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import { RelatedPlant } from "@/components/diseases/RelatedPlant";
import AutoFetching from "@/components/layout/AutoFetching";

type Props = {};

const plantType = (props: Props) => {
  const { type } = useLocalSearchParams();
  const navigate = useNavigation();

  const {
    data: pt,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePlants(type as string);

  if (isLoading && !pt) {
    return <Loading />;
  }

  navigate.setOptions({ title: type });

  return (
    <AutoFetching
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    >
      <View py={"$6"} px={"$1"}>
        <Text mt={10} mb={10} mx={12} fontWeight='900' fontSize={"$lg"}>
          النباتات
        </Text>
        <SmallCardContainer>
          {pt?.pages.map((page) =>
            page.plant.length > 0 ? (
              page.plant?.map((plant) => (
                <RelatedPlant key={plant.id} plant={plant} />
              ))
            ) : (
              <Text>لا توجد نباتات</Text>
            )
          )}
        </SmallCardContainer>
      </View>
    </AutoFetching>
  );
};

const styles = StyleSheet.create({
  PlantsTypesImage: {
    width: "100%",
    height: 140,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

export default plantType;
