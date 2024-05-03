import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import Loading from "@/components/layout/Loading";
import { usePlants } from "@/hooks/usePlant";
import SmallCardContainer from "@/components/layout/SmallCardContainer";
import { RelatedPlant } from "@/components/diseases/RelatedPlant";
import AutoFetching from "@/components/layout/AutoFetching";

type Props = {};

const plantType = (props: Props) => {
  const { type } = useLocalSearchParams();

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

  return (
    <AutoFetching
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    >
      <View>
        <Text fontWeight='700' fontSize={20} pt={9} pb={15} color='#000'>
          {" "}
          انواع النباتات
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
