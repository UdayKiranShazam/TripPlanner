import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';

const BottomBar = ({ navigation }) => {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.ctn}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Entypo name={'home'} color={Colors.white} size={24} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Tripslist')}>
          <FontAwesome
            name={'person-walking-luggage'}
            color={Colors.white}
            size={28}
            onPress={() => navigation.navigate('Tripslist')}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Entypo name={'user'} color={Colors.white} size={24} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Notifications')}>
          <Material name={'bell'} color={Colors.white} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    width: '90%',
    height: 60,
    padding: 10,
    borderRadius: 30,
    elevation: 10,
    backgroundColor: Colors.primary
  },
  ctn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10
  }
});

export default BottomBar;
