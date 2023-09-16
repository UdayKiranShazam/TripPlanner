import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import * as yup from 'yup';
import { Formik } from 'formik';
import Input from '../../components/Input';
import DateInput from '../../components/DateInput';
import Submit from '../../components/Submit';
import moment from 'moment';
import Description from '../../components/Description';
import Header from '../../components/Header';

const AddTask = ({ navigation }) => {
  const [showDate, setShowDate] = useState(false);

  const validate = yup.object().shape({
    taskname: yup
      .string()
      .required('Trip Name is required')
      .min(3, 'Trip Name must be at least 3 characters long')
      .max(30, 'Trip Name must not exceed 20 characters'),
    description: yup.string().max(200, 'Description must not exceed 200 characters'),
    date: yup.string().required('Date is required')
  });

  const initialValues = {
    taskname: '',
    description: '',
    date: ''
  };

  const showDatePicker = () => {
    setShowDate(true);
  };

  const hideDatePicker = () => {
    setShowDate(false);
  };

  const submitData = () => {};

  return (
    <View style={styles.container}>
      <Header title={'Add Task'} navigation={navigation} />
      <Formik
        validationSchema={validate}
        initialValues={initialValues}
        onSubmit={(values) => submitData(values)}>
        {({ handleSubmit, handleChange, setFieldValue, touched, values, errors }) => {
          return (
            <View style={styles.formikCtn}>
              <Input
                title={'Task Name'}
                value={values.tripname}
                error={errors.taskname}
                touched={touched.taskname}
                focus={true}
                placeholder={'Task Name'}
                onChangeText={handleChange('tripname')}
              />
              <DateInput
                placeholder={'Date&Time'}
                title={'Date'}
                onPress={showDatePicker}
                value={values.startdate}
                isVisible={showDate}
                mode={'datetime'}
                onConfirm={(date) => {
                  setFieldValue('date', moment(date).format('DD-MM-YYYY HH:mm:ss'));
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
                touched={touched.date}
                errors={touched.date}
              />
              <Description />

              <View style={styles.submitCtn}>
                <Submit text={'Submit'} onPress={handleSubmit} />
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  headerCtn: {
    marginTop: 8,
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
    fontWeight: '600',
    color: Colors.black
  },
  formikCtn: {
    marginTop: '10%',
    marginHorizontal: 20
  },
  submitCtn: {
    marginTop: '15%',
    alignItems: 'center'
  }
});

export default AddTask;
