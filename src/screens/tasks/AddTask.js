import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import { Colors } from '../../constants/Colors';
import * as yup from 'yup';
import { Formik } from 'formik';
import Input from '../../components/Input';
import DateInput from '../../components/DateInput';
import Submit from '../../components/Submit';
import moment from 'moment';
import Description from '../../components/Description';
import Header from '../../components/Header';
import { fetchCreateTask, fetchUpdateTask } from '../../apis/tasks';
import Toast from 'react-native-toast-message';

const AddTask = ({ navigation, route }) => {
  const id = route.params.id;
  const task = route.params.task;
  const edit = route.params.edit;
  const [showDate, setShowDate] = useState(false);
  const [loader, setLoader] = useState(false);

  const validate = yup.object().shape({
    tripid: yup.number().required('Trip ID is required'),
    taskname: yup
      .string()
      .required('Trip Name is required')
      .min(3, 'Trip Name must be at least 3 characters long')
      .max(30, 'Trip Name must not exceed 20 characters'),
    description: yup.string().max(200, 'Description must not exceed 200 characters'),
    date: yup.string().required('Date is required'),
    completed: yup.boolean()
  });

  const initialValues = {
    tripid: task ? task.tripid : id,
    taskname: task ? task.taskname : '',
    description: task ? task.description : '',
    date: task ? task.date : '',
    completed: task ? task.completed : false
  };

  const showDatePicker = () => {
    setShowDate(true);
  };

  const hideDatePicker = () => {
    setShowDate(false);
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
        values.id = task.id;
        const response = await fetchUpdateTask(values);
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
        const response = await fetchCreateTask(values);
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
                value={values.taskname}
                error={errors.taskname}
                touched={touched.taskname}
                focus={true}
                placeholder={'Task Name'}
                onChangeText={handleChange('taskname')}
              />
              <DateInput
                placeholder={'Date&Time'}
                title={'Date'}
                onPress={showDatePicker}
                value={values.date}
                isVisible={showDate}
                mode={'datetime'}
                onConfirm={(date) => {
                  setFieldValue('date', moment(date).format('YYYY-MM-DD HH:mm:ss'));
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
                touched={touched.date}
                errors={errors.qwertdate}
              />
              <Description
                onChangeText={handleChange('description')}
                value={values.description}
                touched={touched.description}
                error={errors.description}
              />
              <View style={styles.switchCtn}>
                <Text style={styles.switchText}>Completed</Text>
                <Switch
                  trackColor={{ false: Colors.lightgrey, true: Colors.primary }}
                  thumbColor={values.completed ? Colors.cornFlowerBlue : Colors.grey}
                  onValueChange={(value) => {
                    setFieldValue('completed', value);
                  }}
                  value={values.completed}
                />
              </View>

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
  switchCtn: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  switchText: {
    fontSize: 16,
    paddingRight: 16,
    color: Colors.grey
  },
  submitCtn: {
    marginTop: '15%',
    alignItems: 'center'
  }
});

export default AddTask;
