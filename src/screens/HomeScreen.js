import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import CategoryBox from '../components/CategoryBox';
import BottomBar from '../components/BottomBar';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title3Ctn}>
        <Text style={styles.title3}>Explore your world</Text>
      </View>
      <View style={styles.pageInfoCtn}>
        <Text style={styles.pageInfoText}>Travel Plannings</Text>
      </View>
      <View style={styles.planningsCtn}>
        <ScrollView contentContainerStyle={styles.scrollCtn}>
          <View style={styles.categoryCtn}>
            <CategoryBox
              source={require('../assets/images/camping.jpg')}
              category={'Camping'}
              onPress={() => navigation.navigate('Tripslist', { id: 1 })}
            />
            <CategoryBox
              source={require('../assets/images/Surfing.jpg')}
              category={'Surfing'}
              onPress={() => navigation.navigate('Tripslist', { id: 2 })}
            />
          </View>
          <View style={styles.categoryCtn}>
            <CategoryBox
              source={require('../assets/images/dining.jpg')}
              category={'Dining'}
              onPress={() => navigation.navigate('Tripslist', { id: 3 })}
            />
            <CategoryBox
              source={require('../assets/images/road-trip.jpg')}
              category={'Road Trip'}
              onPress={() => navigation.navigate('Tripslist', { id: 4 })}
            />
          </View>
          <View style={styles.categoryCtn}>
            <CategoryBox
              source={require('../assets/images/themeparks.jpg')}
              category={'Theme Parks'}
              onPress={() => navigation.navigate('Tripslist', { id: 5 })}
            />
            <CategoryBox
              source={require('../assets/images/wildlife.jpg')}
              category={'Wildlife'}
              onPress={() => navigation.navigate('Tripslist', { id: 6 })}
            />
          </View>
          <View style={styles.categoryCtn}>
            <CategoryBox
              source={require('../assets/images/hiking.jpg')}
              category={'Hiking'}
              onPress={() => navigation.navigate('Tripslist', { id: 7 })}
            />
            <CategoryBox
              source={require('../assets/images/shopping.jpg')}
              category={'Shopping'}
              onPress={() => navigation.navigate('Tripslist', { id: 8 })}
            />
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
    fontStyle: 'italic',
    color: Colors.cornFlowerBlue
  },
  pageInfoCtn: {
    paddingLeft: 20
  },
  pageInfoText: {
    fontSize: 16,
    fontWeight: '500',
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
    bottom: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
});

export default HomeScreen;
