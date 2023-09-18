import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';

const Description = ({ onChangeText, value, touched, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Description</Text>
      <View style={styles.ctn}>
        <TextInput
          style={styles.input}
          multiline={true}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      <Text style={styles.errorText}>{touched && error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  text: {
    fontSize: 13,
    paddingBottom: 2,
    color: Colors.grey
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
  },
  errorText: {
    paddingTop: 2,
    paddingLeft: 2,
    fontSize: 12,
    color: Colors.red
  }
});

export default Description;
