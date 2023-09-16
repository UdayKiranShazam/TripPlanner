import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/Colors';

const Submit = ({ onPress, text, loader }) => {
  return (
    <View style={styles.ctn}>
      {loader ? (
        <TouchableOpacity style={[styles.submitBtn, { paddingVertical: 10 }]}>
          <ActivityIndicator size={'small'} color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.submitBtn}>
          <Text style={styles.buttonTxt}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ctn: {
    width: '100%',
    alignItems: 'center'
  },
  submitBtn: {
    width: '100%',
    padding: 10,
    borderRadius: 12,
    elevation: 10,
    backgroundColor: Colors.cornFlowerBlue
  },
  buttonTxt: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white
  }
});

export default Submit;
