import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const Card = ({ title, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardStyle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  cardStyle: {
    padding: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black
  },
  date: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.grey
  }
});

export default Card;
