import React, { useState } from "react";
import { View } from "@gluestack-ui/themed";
import { useIdentifyPlant } from "@/hooks/useScan";
import IdentifyPlant from "./IdentifyPlant";
import TakePhoto from "./TakePhoto";
import useSession from "@/hooks/state/useSession";
import Loading from "../layout/Loading";

type Props = {};

const HandlePlantScan = (props: Props) => {
  const [plant, setPlant] = useState<IdentifyPlant | null>(null);
  const identifyPlant = useIdentifyPlant();
  const [isLoading, setIsLoading] = useState(false);
  const handlePicture = async (takenPic: any) => {
    try {
      setIsLoading(true);
      const data = await identifyPlant.mutateAsync({ img: takenPic });
      setPlant(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error identifying plant:", error);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : !plant ? (
    <TakePhoto action={handlePicture} />
  ) : (
    <IdentifyPlant plant={plant} setPlant={setPlant} />
  );
};

export default HandlePlantScan;
