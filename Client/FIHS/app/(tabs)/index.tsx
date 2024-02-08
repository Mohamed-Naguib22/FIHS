import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Fontisto from '@expo/vector-icons/Fontisto'
import { Fab } from '@gluestack-ui/themed';
export default function TabOneScreen() {
  return <>
    <View style={styles.container}>
      <Fab>
        <Fontisto name='reddit'  size={32} color={'#fff'}/>
      </Fab>
    </View>

    </>
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
