import { Text, Image } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export const RelatedPlant = ({ plant }: { plant: Plant }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: "transparent",
        borderColor: "rgba(41, 133, 120,0.6)",
        borderWidth: 1,
        borderRadius: 5,
        height: 180,
        width: 148,
        marginRight: 5,
        marginVertical: 1,
      }}
      onPress={() => router.push(`/(plants)/${plant.id}`)}
    >
      <Image
        style={styles.similar}
        source={plant.imageUrl}
        alt={plant.name}
        // rounded={"$sm"}
        // borderTopLeftRadius={10}
        // borderTopRightRadius={10}
      />
      <Text
        textAlign='center'
        color='#298578'
        marginRight={5}
        fontWeight='700'
        pt={6}
      >
        {plant.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  articlePhotoId: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  similar: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
