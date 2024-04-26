import { Text } from "@gluestack-ui/themed";
import { Image } from "expo-image";
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
        height: 150,
        width: 150,
        marginRight: 10,
        marginVertical: 10,
      }}
      onPress={() => router.push("/plants/")}
    >
      <Image style={styles.similar} source={{ uri: plant.imageUrl }} />
      <Text
        textAlign='center'
        color='#000'
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
    height: 110,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
});
