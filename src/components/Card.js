import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import moment from 'moment';

const Card = ({ title, text, startdate, enddate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardStyle}>
        <View style={styles.titleCtn}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>
            {' - '}
            {text}
          </Text>
        </View>
        <View style={styles.dateCtn}>
          <Text style={styles.date}>{startdate && moment(startdate).format('DD-MMM')}</Text>
          <Text style={styles.date}>{enddate && moment(enddate).format('DD-MMM-YY')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  cardStyle: {
    width: '100%',
    padding: 10,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: Colors.white
  },
  titleCtn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: Colors.black
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    textTransform: 'capitalize',
    color: Colors.darkgrey
  },
  dateCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  date: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.grey
  }
});

export default Card;
