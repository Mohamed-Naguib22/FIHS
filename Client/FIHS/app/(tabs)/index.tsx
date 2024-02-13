import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Fontisto from '@expo/vector-icons/Fontisto'
import { Fab } from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import article from "../../assets/images/image.jpg";

export default function TabOneScreen() {
  return <>
    <View style={styles.container}>
      <Fab>
        <Fontisto name='reddit'  size={32} color={'#fff'}/>
      </Fab>
      <View style={styles.WeatherContainer}>
        <View style={styles.WeatherContentLeft}>
          <Text style={styles.WeatherNum}>19</Text>
          <Text style={styles.center}>القاهره</Text>
        </View>
        <View style={styles.WeatherContentRight}>
        
          <Fontisto style={styles.WeatherIcon} name='cloudy'  size={80} color={'#FCE504'}/>

          <Text style={styles.center}>غائم</Text>
        </View>
      </View>
   
<View style={styles.articlesViewName}>

        <Text style={styles.articlesName}> المقالات</Text>
        <Text style={styles.articlesMore}> المزيد</Text>
</View>
        <ScrollView  style={styles.articlesScrollView} horizontal  contentContainerStyle={{paddingHorizontal:5}}showsHorizontalScrollIndicator={false}>
          <View style={styles.articles}>
            <Image style={styles.articlesImage} source={article} />
            <Text style={styles.articlesHeader}>  النبات </Text>
            <Text style={styles.articlesContent} numberOfLines={1}>عرف الفول منذ أيام الفراعنة ويعدّ مصدراً .....</Text>
          </View>
          <View style={styles.articles}>
            <Image style={styles.articlesImage} source={article} />
            <Text style={styles.articlesHeader}>  النبات </Text>
            <Text style={styles.articlesContent} numberOfLines={1}>عرف الفول منذ أيام الفراعنة ويعدّ مصدراً .....</Text>
          </View>
          <View style={styles.articles}>
            <Image style={styles.articlesImage} source={article} />
            <Text style={styles.articlesHeader}>  النبات </Text>
            <Text style={styles.articlesContent} numberOfLines={1}>عرف الفول منذ أيام الفراعنة ويعدّ مصدراً .....</Text>
          </View>
          <View style={styles.articles}>
            <Image style={styles.articlesImage} source={article} />
            <Text style={styles.articlesHeader}>  النبات </Text>
            <Text style={styles.articlesContent} numberOfLines={1}>عرف الفول منذ أيام الفراعنة ويعدّ مصدراً .....</Text>
          </View>
        </ScrollView>
     
   
    </View>
    </>
  ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#Fff",
    flexDirection:"column",
    gap:40
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor:"#000"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  WeatherContainer: {
    width:"90%",
    // height:"2%",
    padding:10,
    // position:"absolute",
    top:"5%",
    backgroundColor:'rgba(41, 133, 120,0.6)',
    borderRadius:20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection:"row",
    marginBottom:30
    
  },
  WeatherIcon: {
  // bottom:"40%",
  // left:"50%"
  },

  WeatherContentLeft: {
  backgroundColor:"transparent"
},
WeatherContentRight: {
    backgroundColor:"transparent"
  },
  WeatherNum: {
    fontSize:70,
  },
  center: {
    textAlign:"center",
    fontSize:20
  },
  articlesViewName: {
    width:"90%",
    backgroundColor:"transparent",
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection:"row-reverse",
    top:"30%",
    position:"absolute",
    
  },
  articlesName: {
    color:"#000",
    fontWeight:"800",
    backgroundColor:"transparent",
    // marginTop:50
    padding:0,
  },
  articlesMore: {
    color:"#004CCB",
    backgroundColor:"transparent",
    // marginTop:50
    padding:0,
  },
  articlesHeader: {
    textAlign:"right",
    fontSize:18,
    marginEnd:2,
    marginTop:3,
    marginBottom:2,
    color:"#000",
    fontWeight:"900"
  },
  articlesContent: {
    textAlign:"right",
    fontSize:12,
    marginEnd:10,
    marginTop:2,
    color:"#969696",
    fontWeight:"bold"
  },
  articlesScrollView: {
    width:"100%",
    direction:"rtl"
  },
  articles: {
    width:180,
    height:"48%",
    marginLeft:20,
    borderRadius:20,
    backgroundColor:"rgba(58, 171, 117,.3)",     
  },
  articlesImage: {
    maxWidth:"100%",
    height:"65%",
    borderTopEndRadius:20,
    borderTopStartRadius:20,
    left:0,
    top:0,   
  },
});
