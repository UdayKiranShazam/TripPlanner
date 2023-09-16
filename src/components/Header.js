import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';

const Header = ({ title, navigation }) => {
  return (
    <View style={styles.headerCtn}>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicon name={'arrow-back'} size={30} color={Colors.cornFlowerBlue} />
      </Pressable>
      <View style={styles.titleCtn}>
        <Text style={styles.headertitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerCtn: {
    marginTop: 12,
    marginHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleCtn: {
    flex: 1,
    alignItems: 'center'
  },
  headertitle: {
    fontSize: 20,
    fontWeight: '800',
    paddingRight: 25,
    color: Colors.darkgrey
  }
});

export default Header;
