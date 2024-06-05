import React from "react";
import { useLocalSearchParams } from "expo-router";
import Loading from "@/components/layout/Loading";
import usePest from "@/hooks/usePest";
import PestForm from "@/components/admin/pests/PestForm";

type Props = {};

const PestUpdate = (props: Props) => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = usePest(id as string);
  if (isLoading) {
    return <Loading />;
  }
  return <PestForm initial={data} />;
};

export default PestUpdate;
