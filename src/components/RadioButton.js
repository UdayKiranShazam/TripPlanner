import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const RadioButton = ({ show }) => {
  return (
    <View style={{ paddingVertical: 5 }}>
      {show ? (
        <View style={[styles.dotCtn]}>
          <View style={[styles.dot]} />
        </View>
      ) : (
        <View style={[styles.inactiveDot]}></View>
      )}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  dotCtn: {
    borderWidth: 2,
    borderColor: Colors.limegreen,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderRadius: 10
  },
  dot: {
    height: 11.6,
    width: 11.6,
    borderRadius: 6,
    backgroundColor: Colors.limegreen
  },
  inactiveDot: {
    borderWidth: 2,
    borderColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderRadius: 10
  }
});
