import React, { useState } from "react";
import {
  HStack,
  Link,
  LinkText,
  VStack,
  Text,
  Image,
} from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { DeleteFavourite } from "@/hooks/useFavourite";
import useSession from "@/hooks/state/useSession";
type Props = {
  plant: FavPlant;
  refresh: () => void;
};

const FavouriteCard = ({ plant, refresh }: Props) => {
  const [isFavourite, setIsFavourite] = useState(true);
  const { favouriteId } = useSession();
  const RemoveFav = DeleteFavourite();
  const router = useRouter();

  const handleRemoveFav = () => {
    RemoveFav.mutate(
      {
        vals: { favouriteId: favouriteId, plantId: plant.plantId! },
      },
      {
        onSuccess(data, variables, context) {
          setIsFavourite(false);
          refresh();
        },
      }
    );
  };
  return (
    <HStack
      gap={"$2"}
      bg='#fff'
      alignItems='center'
      justifyContent='space-between'
      borderRadius={"$lg"}
      borderWidth={1}
      borderColor='$rgb(41, 133, 120)'
    >
      <HStack mr={0} px={"$2"}>
        <VStack
          bg='$#fff'
          borderWidth={1}
          borderColor='$rgb(41, 133, 120)'
          alignItems='center'
          justifyContent='center'
          w={"$10"}
          h={"$10"}
          p={"$2"}
          borderRadius={"$lg"}
        >
          <TouchableOpacity onPress={handleRemoveFav}>
            <Text color='$red600'>
              <FontAwesome size={22} name={`heart${isFavourite ? "" : "-o"}`} />
            </Text>
          </TouchableOpacity>
        </VStack>
      </HStack>
      <VStack py={"$1"} gap={"$2"}>
        <Text size='lg' fontWeight='bold' color='$textDark950'>
          {plant.plant.name}
        </Text>
        <TouchableOpacity
          onPress={() => router.push(`/plants/${plant.plant.id}`)}
        >
          <Text color='$textDark800'>مزيد من التفاصيل -{">"}</Text>
        </TouchableOpacity>
      </VStack>
      <Image
        source={plant.plant.imageUrl}
        alt={plant.plant.name}
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
          borderTopRightRadius: 7,
          borderBottomRightRadius: 7,
          marginLeft: -1,
        }}
      />
    </HStack>
  );
};

export default FavouriteCard;
