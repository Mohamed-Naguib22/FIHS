import { View, Text } from "react-native";
import React, { useEffect } from "react";
import TabsPageContainer from "@/components/layout/TabsPageContainer";
import Weather from "@/components/home/Weather";
import ArticleCard from "@/components/home/ArticleCard";
import Section from "@/components/layout/Section";
import PlantsTypes from "@/components/home/PlantsTypes";
import useTabsHeaderName from "@/hooks/state/useTabsHeaderName";
import { Redirect } from "expo-router";

type Props = {};

const HomePage = (props: Props) => {
  const { setName } = useTabsHeaderName();
  useEffect(() => {
    setName("الرئيسية");
  }, []);

  return <Redirect href={"/(tabs)/home"} />;
};

export default HomePage;
