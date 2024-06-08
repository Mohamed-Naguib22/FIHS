import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { HStack, InputField, VStack, Text, Image } from "@gluestack-ui/themed";
import { Input } from "@gluestack-ui/themed";
import { InputSlot } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useTabHeaderHeight } from "../../hooks/state/useTabHeaderHeight";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAnimationState, MotiView } from "moti";
import useTabsHeaderName from "@/hooks/state/useTabsHeaderName";
import useSearch from "@/hooks/useSearch";
import { TouchableOpacity } from "react-native-gesture-handler";
const TabsHeader = () => {
  const animationState = useAnimationState({
    top: {
      height: 175,
    },
    scrolled: {
      height: 85,
    },
  });
  const { isTop } = useTabHeaderHeight();
  useEffect(() => {
    !isTop
      ? animationState.transitionTo("scrolled")
      : animationState.transitionTo("top");
  }, [isTop]);
  const { name } = useTabsHeaderName();
  const search = useSearch();
  const [searchVal, setSearchVal] = useState("");
  const [resaults, setResaults] = useState<FullPlant[]>([]);
  useEffect(() => {
    search.mutate(
      { term: searchVal },
      {
        onSuccess(data, variables, context) {
          setResaults(data);
        },
        onError(error, variables, context) {
          setResaults([]);
        },
      }
    );
  }, [searchVal]);
  return (
    <MotiView
      transition={{ type: "spring", damping: 50, delay: isTop ? 150 : 200 }}
      state={animationState}
      style={{ maxHeight: 175, paddingTop: 0, marginTop: -8 }}
    >
      <StatusBar style={"light"} />
      <VStack pt={"$2"} h={"$0.5"}>
        <HStack justifyContent='space-between' px={"$6"} pt={"$10"}>
          <Text
            color='$primary400'
            zIndex={5}
            size='xl'
            position='absolute'
            top={"$10"}
            right={"$6"}
          >
            {name}
          </Text>
          <Image
            style={styles.logo}
            source={require("@/assets/images/Logofinal.png")}
            alt='logo'
            objectFit='cover'
          />
        </HStack>
      </VStack>
      <VStack gap={"$0.5"} position='relative' h={"$full"} maxHeight={175}>
        <Image
          style={styles.BG}
          source={require("@/assets/images/logoBG.jpg")}
          alt='logo'
        />
        {
          <MotiView
            animate={{ translateX: isTop ? 0 : 500, translateY: 75 }}
            transition={{ delay: isTop ? 500 : 0, damping: 50 }}
            style={{ padding: 25, backgroundColor: "transparent", zIndex: 5 }}
          >
            <Input flexDirection='row-reverse' variant='rounded'>
              <HStack
                px={"$3"}
                bg='$white'
                alignItems='center'
                justifyContent='space-between'
                gap={"$1"}
                w={"$full"}
              >
                <InputSlot backgroundColor='$white'>
                  <FontAwesome
                    name='search'
                    color={Colors.light.tint}
                    size={18}
                    style={{ paddingRight: 10 }}
                  />
                </InputSlot>
                <InputField
                  style={{ textAlign: "right" }}
                  backgroundColor='$white'
                  borderColor='$primary500'
                  direction='rtl'
                  placeholder='بحث'
                  value={searchVal}
                  onChangeText={(e) => setSearchVal(e)}
                />
                <InputSlot backgroundColor='$white'>
                  <Feather
                    name='camera'
                    color={Colors.light.tint}
                    size={18}
                    style={{ paddingLeft: 10 }}
                  />
                </InputSlot>
              </HStack>
            </Input>
          </MotiView>
        }
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(41, 133, 120, 0.15)",
            zIndex: 1,
          }}
        />
      </VStack>
      {resaults.length > 0 && isTop && (
        <VStack bg='$backgroundDark0' gap={"$5"} p={"$5"}>
          {resaults.map((plant) => {
            return (
              <TouchableOpacity
                key={plant.id}
                onPress={() => {
                  setResaults([]);
                  setSearchVal("");
                  router.push(`/plants/${plant.id}`);
                }}
              >
                <HStack
                  bg='$backgroundDark200'
                  p={"$3"}
                  gap={"$1.5"}
                  rounded={"$sm"}
                >
                  <Image
                    source={{ uri: plant.imageUrl }}
                    style={{ width: 75, height: 75 }}
                    alt={plant.name}
                    rounded={"$sm"}
                  />
                  <VStack gap={"$1"} alignItems='flex-start' w={"$3/4"}>
                    <Text fontSize={"$lg"} fontWeight='$bold'>
                      {plant.name}
                    </Text>
                    <Text fontSize={"$sm"}>{plant.commonUses}</Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            );
          })}
        </VStack>
      )}
    </MotiView>
  );
};

export default TabsHeader;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 35,
    objectFit: "cover",
    zIndex: 5,
  },
  BG: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    position: "absolute",
    objectFit: "cover",
    zIndex: 0,
  },
  BG1: {
    width: "100%",
    height: "100%",
    // transform:"translateY(-20px)",
  },
});
