import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
//import Ionicon from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import { Formik } from 'formik';
import Input from '../../components/Input';
import DateInput from '../../components/DateInput';
import Submit from '../../components/Submit';
import Header from '../../components/Header';
import moment from 'moment';

const AddTrip = ({ navigation }) => {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);

  const validate = yup.object().shape({
    tripname: yup
      .string()
      .required('Trip Name is required')
      .min(3, 'Trip Name must be at least 3 characters long')
      .max(20, 'Trip Name must not exceed 20 characters'),
    destination: yup
      .string()
      .required('Destination is required')
      .min(3, 'Destination must be at least 3 characters long')
      .max(20, 'Destination must not exceed 20 characters'),
    startdate: yup.string().required('Start Date is required'),
    enddate: yup.string().required('End Date is required')
  });

  const initialValues = {
    tripname: '',
    destination: '',
    startdate: '',
    enddate: ''
  };

  const showStartDate = () => {
    setStartDate(true);
  };

  const hidestartDate = () => {
    setStartDate(false);
  };

  const showEndDate = () => {
    setEndDate(true);
  };

  const hideEndDate = () => {
    setEndDate(false);
  };

  const submitData = () => {};

  return (
    <View style={styles.container}>
      <Header title={'Add Trip'} navigation={navigation} />
      <Formik
        validationSchema={validate}
        initialValues={initialValues}
        onSubmit={(values) => submitData(values)}>
        {({ handleSubmit, handleChange, setFieldValue, touched, values, errors }) => {
          return (
            <View style={styles.formikCtn}>
              <Input
                title={'Trip Name'}
                value={values.tripname}
                error={errors.tripname}
                touched={touched.tripname}
                focus={true}
                placeholder={'Trip Name'}
                onChangeText={handleChange('tripname')}
              />
              <Input
                title={'Destination'}
                value={values.destination}
                error={errors.destination}
                touched={touched.destination}
                placeholder={'Destination'}
                onChangeText={handleChange('destination')}
              />
              <DateInput
                placeholder={'StartDate'}
                title={'StartDate'}
                onPress={showStartDate}
                value={values.startdate}
                isVisible={startDate}
                onConfirm={(date) => {
                  setFieldValue('startdate', moment(date).format('DD-MM-YYYY'));
                  hidestartDate();
                }}
                onCancel={hidestartDate}
                touched={touched.startdate}
                errors={touched.startdate}
              />
              <DateInput
                placeholder={'EndDate'}
                title={'EndDate'}
                onPress={showEndDate}
                value={values.enddate}
                isVisible={endDate}
                onConfirm={(date) => {
                  setFieldValue('enddate', moment(date).format('DD-MM-YYYY'));
                  hideEndDate();
                }}
                onCancel={hideEndDate}
                touched={touched.startdate}
                errors={touched.enddate}
              />

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
  formikCtn: {
    marginTop: '10%',
    marginHorizontal: 20
  },
  submitCtn: {
    marginTop: '15%',
    alignItems: 'center'
  }
});

export default AddTrip;
