import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import CategoryBox from '../components/CategoryBox';
import BottomBar from '../components/BottomBar';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const userData = user ? JSON.parse(user) : null;
  console.log(userData);

  return (
    <View style={styles.container}>
      {/* <View style={styles.titleCtn}>
            <Text style={styles.title1}>Hi, </Text>
            <Text style={styles.title2}>{userData?.username}</Text>
        </View> */}
      <View style={styles.title3Ctn}>
        <Text style={styles.title3}>Explore your world</Text>
      </View>
      <View style={styles.planningsCtn}>
        <ScrollView contentContainerStyle={styles.scrollCtn}>
          <View style={styles.categoryCtn}>
            <CategoryBox source={require('../assets/images/camping.jpg')} category={'Camping'} />
            <CategoryBox source={require('../assets/images/Surfing.jpg')} category={'Surfing'} />
          </View>
          <View style={styles.categoryCtn}>
            <CategoryBox source={require('../assets/images/dining.jpg')} category={'Dining'} />
            <CategoryBox
              source={require('../assets/images/road-trip.jpg')}
              category={'Road Trip'}
            />
          </View>
          <View style={styles.categoryCtn}>
            <CategoryBox
              source={require('../assets/images/themeparks.jpg')}
              category={'Theme Parks'}
            />
            <CategoryBox source={require('../assets/images/wildlife.jpg')} category={'Wildlife'} />
          </View>
          <View style={styles.categoryCtn}>
            <CategoryBox source={require('../assets/images/hiking.jpg')} category={'Hiking'} />
            <CategoryBox source={require('../assets/images/shopping.jpg')} category={'Shopping'} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomBarCtn}>
        <BottomBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  scrollCtn: {
    //flex: 1,
    width: '100%'
  },
  titleCtn: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title1: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.black
  },
  title2: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.seagreen
  },
  title3Ctn: {
    marginVertical: 20
  },
  title3: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.grey
  },
  planningsCtn: {
    marginHorizontal: 8
  },
  categoryCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  bottomBarCtn: {
    position: 'absolute',
    bottom: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
});

export default HomeScreen;
