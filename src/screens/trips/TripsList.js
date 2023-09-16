import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import Material from 'react-native-vector-icons/MaterialIcons';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { fetchTrips } from '../../apis/trips';

const TripsList = ({ navigation }) => {
  useEffect(() => {
    getTripsList();
  }, []);

  const getTripsList = async () => {
    const response = await fetchTrips(1);
    console.log(response);
  };

  return (
    <View style={styles.container}>
      <Header title={'Trips'} navigation={navigation} />
      <View style={styles.dropdownCtn}>
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownView}>
            <Text style={styles.dropdownText}>Select Trip</Text>
            <Material name={'arrow-drop-down'} color={Colors.grey} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addbtn}>
            <Text>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardCtn}>
          <Card />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  dropdownCtn: {
    //marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  dropdown: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    elevation: 10,
    height: 50,
    width: '70%',
    paddingHorizontal: 15,
    backgroundColor: Colors.white
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.grey
  },
  addbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 20,
    height: 50,
    width: '28%',
    backgroundColor: Colors.white
  },
  cardCtn: {}
});

export default TripsList;
