import { Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import Loading from "../layout/Loading";
import TakePhoto from "./TakePhoto";
import { useDetectDisease } from "@/hooks/useScan";
import DetectDisease from "./DetectDisease";

const HandleDiseaseScan = () => {
  const [disease, setDisease] = useState<DetectDisease | null>(null);
  const detectDisease = useDetectDisease();
  const [isLoading, setIsLoading] = useState(false);
  const handlePicture = async (takenPic: any) => {
    try {
      setIsLoading(true);
      const data = await detectDisease.mutateAsync({ img: takenPic });
      setDisease(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error Detecting Disease:", error);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : !disease ? (
    <TakePhoto action={handlePicture} />
  ) : (
    <DetectDisease disease={disease} setDisease={setDisease} />
  );
};

export default HandleDiseaseScan;
