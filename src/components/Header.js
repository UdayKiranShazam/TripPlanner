import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';

const Header = ({ title, navigation, onPress, show }) => {
  return (
    <View style={styles.headerCtn}>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicon name={'arrow-back'} size={30} color={Colors.cornFlowerBlue} />
      </Pressable>
      <View style={styles.titleCtn}>
        <Text style={styles.headertitle}>{title}</Text>
      </View>
      {show && (
        <Pressable onPress={onPress}>
          <Ionicon name={'add-sharp'} size={30} color={Colors.cornFlowerBlue} style={styles.icon} />
        </Pressable>
      )}
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
    paddingRight: 16,
    color: Colors.darkgrey
  },
  icon: {
    marginRight: 5
  }
});

export default Header;
