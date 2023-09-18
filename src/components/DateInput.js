import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Colors } from '../constants/Colors';

const DateInput = ({
  value,
  mode,
  title,
  isVisible,
  onConfirm,
  onCancel,
  touched,
  errors,
  onPress,
  placeholder
}) => {
  return (
    <View style={styles.rootContainer}>
      <View style={[styles.dateCtn]}>
        <View style={styles.textCtn}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.dateHolder}>
          <Pressable onPress={onPress} style={styles.dateText}>
            <Text style={[styles.dateText, { color: value ? Colors.black : Colors.lightgrey }]}>
              {value ? value : placeholder}
            </Text>
          </Pressable>
        </View>

        <DateTimePickerModal
          isVisible={isVisible}
          is24Hour={true}
          mode={mode ? mode : 'date'}
          display="spinner"
          onConfirm={onConfirm}
          onCancel={onCancel}
          date={
            value
              ? mode
                ? new Date(moment(value).format('YYYY-MM-DD HH:mm:ss'))
                : new Date(moment(value).format('YYYY-MM-DD'))
              : new Date()
          }
        />
      </View>
      <Text style={styles.errorText}>{touched && errors}</Text>
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 25
  },
  dateHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.slightblack,
    paddingTop: 5,
    paddingBottom: 4
  },
  textCtn: {},
  text: {
    fontSize: 12,
    color: Colors.grey
  },
  dateIcon: {
    paddingLeft: 0
  },
  dateText: {
    width: '65%',
    fontSize: 16,
    paddingLeft: 0
  },
  errorText: {
    paddingTop: 2,
    paddingLeft: 2,
    fontSize: 12,
    color: Colors.red
  }
});
