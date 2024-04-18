import useWeather from "@/hooks/useWeather";
import { Fontisto } from "@expo/vector-icons";
import { View, HStack, VStack, Text } from "@gluestack-ui/themed";
import { Image } from "expo-image";
import React from "react";

const Weather = () => {
  const { data: weather } = useWeather("giza");
  return (
    <View
      bg='rgba(41, 133, 120,0.6)'
      borderRadius={"$lg"}
      px={"$8"}
      py={"$2"}
      my={"$2"}
    >
      <HStack justifyContent='space-between' alignItems='center'>
        <VStack justifyContent='center' position='relative' alignItems='center'>
          <Text color='$white' size={"6xl"} fontWeight='$extrabold'>
            {weather?.temperature}
          </Text>
          <Text
            color='$white'
            fontWeight='$medium'
            size='xl'
            right={"$16"}
            bottom={"$20"}
            position='absolute'
          >
            c
          </Text>
          <Text color='$white' mb={"$1"} fontSize={"$xl"} fontWeight='$bold'>
            {weather?.city}
          </Text>
        </VStack>
        <VStack gap={"$3"} justifyContent='center' alignItems='center'>
          <Image source={weather?.icon} style={{ width: 100, height: 75 }} />
          <Text color='$white' fontSize={"$xl"} fontWeight='$bold'>
            {weather?.description}
          </Text>
        </VStack>
      </HStack>
    </View>
  );
};

export default Weather;
