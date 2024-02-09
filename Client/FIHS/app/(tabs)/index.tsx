import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Fontisto from '@expo/vector-icons/Fontisto'
import { Fab } from '@gluestack-ui/themed';
// import { useNavigation } from 'expo-router';
import { useTabHeaderHeight } from '@/components/layout/useTabHeaderHeight';
import { useDerivedValue } from 'react-native-reanimated';
import TabsPageContainer from '@/components/layout/TabsPageContainer';
export default function TabOneScreen() {
  const {heightWithoutSearch, heightWithSearch} = useTabHeaderHeight()  
  return <TabsPageContainer>
      <Text style={styles.title}>shhhs</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
      <Text style={styles.title}>hi</Text>
    </TabsPageContainer>
  ;
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
