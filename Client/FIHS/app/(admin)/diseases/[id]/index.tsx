import React from "react";
import { useLocalSearchParams } from "expo-router";
import useDisease from "@/hooks/useDisease";
import Loading from "@/components/layout/Loading";
import DiseaseForm from "@/components/admin/diseases/DiseaseForm";

type Props = {};

const DiseaseUpdate = (props: Props) => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useDisease(id as string);
  if (isLoading) {
    return <Loading />;
  }
  return <DiseaseForm initial={data} />;
};

export default DiseaseUpdate;
