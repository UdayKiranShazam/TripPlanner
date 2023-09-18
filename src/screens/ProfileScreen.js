import React, { useContext, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Colors } from '../constants/Colors';
import Header from '../components/Header';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/Input';
import Submit from '../components/Submit';
import { fetchUpdateProfile, fetchProfile } from '../apis/user';
import Toast from 'react-native-toast-message';

const ProfileScreen = ({ navigation }) => {
  const { user, saveUserData, logOut } = useContext(AuthContext);
  const userData = user ? JSON.parse(user) : null;
  const [loader, setLoader] = useState(false);

  const validate = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .max(30, 'Username must not exceed 30 characters'),
    email: yup
      .string()
      .required('Email is required')
      .max(30, 'Email must not exceed 30 characters'),
    mobile_no: yup.string().max(16, 'Mobile number must not exceed 16 characters')
  });

  const initialValues = {
    username: userData ? userData.username : '',
    email: userData ? userData.email : '',
    mobile_no: userData ? userData.mobile_no : ''
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
      const response = await fetchUpdateProfile(values);
      if (response.status) {
        const user = await fetchProfile();
        saveUserData(JSON.stringify(user.data));
        toast('success', response.message);
        setLoader(false);
      } else {
        toast('error', response.message);
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      toast('error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Profile'} navigation={navigation} />
      <Formik
        validationSchema={validate}
        initialValues={initialValues}
        onSubmit={(values) => submitData(values)}>
        {({ handleSubmit, handleChange, touched, errors, values }) => {
          return (
            <View style={styles.formikCtn}>
              <Input
                title={'Username'}
                value={values.username}
                onChangeText={handleChange('username')}
                placeholder={'Username'}
                touched={touched.username}
                error={errors.username}
              />
              <Input
                title={'Email'}
                value={values.email}
                email={true}
                placeholder={'Email'}
                touched={touched.email}
                error={errors.email}
                editable={false}
                focus={false}
              />
              <Input
                title={'Mobile'}
                value={values.mobile_no}
                placeholder={'4444444444'}
                touched={touched.mobile_no}
                error={errors.mobile_no}
                onChangeText={handleChange('mobile_no')}
              />
              <View style={styles.submitCtn}>
                <Submit loader={loader} text={'Submit'} onPress={handleSubmit} />
              </View>
            </View>
          );
        }}
      </Formik>
      <View style={styles.logoutCtn}>
        <Pressable onPress={logOut}>
          <Text style={styles.logOutText}>Logout</Text>
        </Pressable>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  formikCtn: {
    marginTop: '12%',
    marginHorizontal: 20
  },
  submitCtn: {
    marginTop: '15%',
    alignItems: 'center'
  },
  logoutCtn: {
    position: 'absolute',
    bottom: '4%',
    left: 20
  },
  logOutText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.grey
  }
});

export default ProfileScreen;
