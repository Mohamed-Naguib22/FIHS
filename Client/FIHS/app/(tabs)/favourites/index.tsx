import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import TabsPageContainer from '@/components/layout/TabsPageContainer';
import ScreenHeader from '@/components/layout/ScreenHeader';
import {VStack} from '@gluestack-ui/themed';
import FavouriteCard from '@/components/favourites/FavouriteCard';
export default function FavouritesScreen() {
  return (
    <TabsPageContainer>
      <ScreenHeader name='المفضلة'>
        <VStack gap={"$5"}>
          <FavouriteCard/>
          <FavouriteCard/>
          <FavouriteCard/>
          <FavouriteCard/>
          <FavouriteCard/>
          <FavouriteCard/>
          <FavouriteCard/>
        </VStack>
      </ScreenHeader>
    </TabsPageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
