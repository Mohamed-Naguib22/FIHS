import PesticideForm from "@/components/admin/pesticide/PesticideForm";
import Loading from "@/components/layout/Loading";
import usePesticide from "@/hooks/usePesticide";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function AdminUpdatePesticide() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = usePesticide(id as string);
  if (isLoading) {
    return <Loading />;
  }
  return <PesticideForm initial={data} />;
}
