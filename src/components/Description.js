import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';

const Description = () => {
  return (
    <View style={styles.container}>
      <Text>Description</Text>
      <View style={styles.ctn}>
        <TextInput style={styles.input} multiline={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  ctn: {
    height: 120,
    borderWidth: 1,
    borderColor: Colors.slightblack
  },
  input: {
    width: '98%',
    padding: 1,
    fontSize: 16,
    color: Colors.black
  }
});

export default Description;
