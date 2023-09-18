import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';

const TaskCard = ({ title, date, name, color, hide }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardStyle}>
        <View style={styles.titleCtn}>
          <Text style={styles.title}>{title}</Text>
          {!hide && (
            <Text style={styles.text}>{date && moment(date).format('DD-MMM-YY HH:mm')}</Text>
          )}
        </View>
        <View style={styles.IconCtn}>
          <Icon name={name} color={color} size={30} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: Colors.white
  },
  titleCtn: {
    marginLeft: 5
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: Colors.black
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.grey
  },
  IconCtn: {
    marginRight: 10
  }
});

export default TaskCard;
