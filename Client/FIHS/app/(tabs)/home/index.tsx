import { Button, ButtonText, Text } from '@gluestack-ui/themed';
import TabsPageContainer from '@/components/layout/TabsPageContainer';
import Section from '@/components/layout/Section';
import ArticleCard from '@/components/home/ArticleCard';
import useArticles from '@/hooks/useArticles';
import Weather from '@/components/home/Weather';
import PlantsTypes from '@/components/home/PlantsTypes';
import { useEffect } from 'react';
import useTabsHeaderName from '@/hooks/state/useTabsHeaderName';
import { useRouter } from 'expo-router';
export default function TabOneScreen() {
  const {data:arts, isLoading} = useArticles()  
  const {setName} = useTabsHeaderName()
  const router = useRouter()
  useEffect(()=>{
    setName("الرئيسية")
},[])
  // if(isLoading){
  //   return <TabsPageContainer>
  //     <Text>جاري التحميل....</Text>
  //   </TabsPageContainer>
  // }
  return <TabsPageContainer>
        <Weather/>
        <Button onPress={()=>router.push('/(auth)/login')}>
          <ButtonText>تسجيل الدخول</ButtonText>
        </Button>
        <Section name='المقالات' link='/'>
          {
            arts?.slice(0, 6).map((art)=>{
              return <ArticleCard {...art}/>
            })
          }
        </Section>     
        <Section name='أنواع النباتات' link='/'>
         <PlantsTypes/>
        </Section>     

    </TabsPageContainer>
    
  ;
}
