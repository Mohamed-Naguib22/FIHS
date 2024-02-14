import { Text } from '@gluestack-ui/themed';
import TabsPageContainer from '@/components/layout/TabsPageContainer';
import ArticleCard from '@/components/home/ArticleCard';
import Section from '@/components/layout/Section';
import useArticles from '@/hooks/useArticles';
import Weather from '@/components/home/Weather';
export default function TabOneScreen() {
  const {data:arts, isLoading} = useArticles()  
  if(isLoading){
    return <TabsPageContainer>
      <Text>جاري التحميل.</Text>
    </TabsPageContainer>
  }
  return <TabsPageContainer>
        <Weather/>
        <Section name='المقالات' link='/'>
          {
            arts?.slice(0, 6).map((art)=>{
              return <ArticleCard {...art}/>
            })
          }
        </Section>        
    </TabsPageContainer>
  ;
}
