import TabsPageContainer from "@/components/layout/TabsPageContainer";
import Section from "@/components/layout/Section";
import ArticleCard from "@/components/home/ArticleCard";
import Weather from "@/components/home/Weather";
import PlantsTypes from "@/components/home/PlantsTypes";
import { useEffect } from "react";
import useTabsHeaderName from "@/hooks/state/useTabsHeaderName";

export default function TabOneScreen() {
  const { setName } = useTabsHeaderName();
  useEffect(() => {
    setName("الرئيسية");
  }, []);

  return (
    <TabsPageContainer>
      <Weather />
      <ArticleCard />
      <Section name='أنواع النباتات' link='/plant-types/' swipe={false}>
        <PlantsTypes />
      </Section>
    </TabsPageContainer>
  );
}
