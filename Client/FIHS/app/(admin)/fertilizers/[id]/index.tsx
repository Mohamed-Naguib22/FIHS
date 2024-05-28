import FertilizerForm from "@/components/admin/fertilizer/FertilizerForm";
import Loading from "@/components/layout/Loading";
import useFertilizer from "@/hooks/useFertilizer";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function AdminUpdateFertilizer() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useFertilizer(id as string);
  if (isLoading) {
    return <Loading />;
  }
  return <FertilizerForm initial={data} />;
}
