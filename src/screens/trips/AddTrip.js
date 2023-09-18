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
import { fetchCreateTrips, fetchUpdateTrips } from '../../apis/trips';
import Toast from 'react-native-toast-message';

const AddTrip = ({ navigation, route }) => {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const edit = route.params?.edit;
  const trip = route.params?.trip;
  const selectedId = route.params?.id;
  const [loader, setLoader] = useState(false);

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
    tripname: trip ? trip.tripname : '',
    destination: trip ? trip.destination : '',
    startdate: trip ? trip.startdate : '',
    enddate: trip ? trip.enddate : '',
    categoryid: trip ? trip.categoryid : selectedId
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

  const toast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
      visibilityTime: 2000
    });
  };

  const submitData = async (values) => {
    try {
      setLoader(true);
      if (edit) {
        values.id = trip.id;
        const response = await fetchUpdateTrips(values);
        if (response.status) {
          toast('success', response.message);
          setTimeout(() => {
            setLoader(false);
            navigation.goBack();
          }, 2000);
        } else {
          setLoader(false);
          toast('error', response?.message);
        }
      } else {
        const response = await fetchCreateTrips(values);
        if (response.status) {
          toast('success', response.message);
          setTimeout(() => {
            setLoader(false);
            navigation.goBack();
          }, 2000);
        } else {
          setLoader(false);
          toast('error', response?.message);
        }
      }
    } catch (err) {
      setLoader(false);
      toast('error', err?.message);
    }
  };

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
                  setFieldValue('startdate', moment(date).format('YYYY-MM-DD'));
                  hidestartDate();
                }}
                onCancel={hidestartDate}
                touched={touched.startdate}
                errors={errors.startdate}
              />
              <DateInput
                placeholder={'EndDate'}
                title={'EndDate'}
                onPress={showEndDate}
                value={values.enddate}
                isVisible={endDate}
                onConfirm={(date) => {
                  setFieldValue('enddate', moment(date).format('YYYY-MM-DD'));
                  hideEndDate();
                }}
                onCancel={hideEndDate}
                touched={touched.startdate}
                errors={errors.enddate}
              />

              <View style={styles.submitCtn}>
                <Submit loader={loader} text={'Submit'} onPress={handleSubmit} />
              </View>
            </View>
          );
        }}
      </Formik>
      <Toast />
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
