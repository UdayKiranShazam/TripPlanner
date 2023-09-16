import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const Input = ({ title, placeholder, value, touched, error, onChangeText, focus }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ctn}>
        <View style={styles.textCtn}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.inputCtn}>
          <TextInput
            style={styles.input}
            autoFocus={focus ? focus : false}
            placeholder={placeholder}
            onChangeText={onChangeText}
            placeholderTextColor={Colors.lightgrey}
            value={value}
          />
        </View>
      </View>
      <Text style={styles.errorText}>{touched && error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 25
  },
  ctn: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.slightblack
  },
  textCtn: {},
  text: {
    fontSize: 12,
    color: Colors.grey
  },
  inputCtn: {
    padding: 0
  },
  input: {
    padding: 0,
    fontSize: 16,
    color: Colors.black
  },
  errorText: {
    paddingTop: 2,
    paddingLeft: 2,
    color: Colors.red,
    fontSize: 12
  }
});

export default Input;
