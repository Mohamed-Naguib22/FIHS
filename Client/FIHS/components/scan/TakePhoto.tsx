import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Button, ButtonText, HStack, VStack, View } from "@gluestack-ui/themed";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Text } from "@gluestack-ui/themed";

export default function TakePhoto({
  action,
}: {
  action: (takenPic: any) => void;
}) {
  const cameraRef = useRef<React.LegacyRef<Camera>>(null);
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>(false);
  const [photo, setPhoto] = useState();
  const [torch, setTorch] = useState(FlashMode.off);
  const [cameraType, setcameraType] = useState(CameraType.back);
  useEffect(() => {
    (async () => {
      const cPermission = await Camera.requestCameraPermissionsAsync();
      const mbPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cPermission.status === "granted");
      setHasMediaLibraryPermission(mbPermission.status === "granted");
    })();
  }, []);
  const takePic = async () => {
    const takenPic = await (cameraRef?.current as any)?.takePictureAsync({
      quality: 1,
      base64: true,
      exif: false,
      mimeType: "image/jpg",
    });
    setPhoto(takenPic);
    action(takenPic);
  };
  // useEffect(() => {
  // console.log(photo);
  // }, [photo]);
  return (
    <Camera
      style={{ flex: 1 }}
      flashMode={torch}
      ratio='16:9'
      ref={cameraRef as any}
      type={cameraType}
    >
      <View
        flex={1}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <BlurView
          intensity={10}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            paddingVertical: 5,
            backgroundColor: "rgba(0 0 0 / 0.75)",
          }}
        >
          <HStack>
            <Button
              w={"$16"}
              backgroundColor={"transparent"}
              h={"$16"}
              mt={"$3"}
              rounded={"$full"}
            >
              <ButtonText
                onPress={() =>
                  torch === FlashMode.off
                    ? setTorch(FlashMode.torch)
                    : setTorch(FlashMode.off)
                }
              >
                <Ionicons
                  name={torch === FlashMode.torch ? "flash-off" : "flash"}
                  size={20}
                />
              </ButtonText>
            </Button>
            <Button
              w={"$16"}
              backgroundColor={"transparent"}
              h={"$16"}
              mt={"$3"}
              rounded={"$full"}
            >
              <ButtonText
                onPress={() =>
                  cameraType === CameraType.back
                    ? setcameraType(CameraType.front)
                    : setcameraType(CameraType.back)
                }
              >
                <MaterialIcons name='flip-camera-ios' size={20} />
              </ButtonText>
            </Button>
          </HStack>
        </BlurView>
        <VStack gap={"$1.5"} alignItems='center' justifyContent='center'>
          {/* <Text color='$white' size='sm' w={"$full"}>
            من فضلك ضع النبات داخل الإطار ليتم التعرف عليه بسهولة
          </Text> */}
          <Ionicons name='scan' style={{ fontSize: 200 }} color={"#FFF"} />
        </VStack>
        <BlurView
          intensity={10}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "rgba(0 0 0 / 0.75)",
          }}
        >
          {!photo && (
            <Button w={"$16"} h={"$16"} rounded={"$full"} onPress={takePic}>
              <ButtonText>
                <FontAwesome name='camera' size={20} />
              </ButtonText>
            </Button>
          )}
        </BlurView>
      </View>
      <StatusBar style='light' />
    </Camera>
  );
}
