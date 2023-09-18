import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import GoogleIcon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { env } from '../../environment';
import Toast from 'react-native-toast-message';
import { googleApi } from '../apis/auth';
import { fetchProfile } from '../apis/user';

const StartScreen = () => {
  const { webClientId, androidClientId } = env;
  const { logIn, saveUserData } = useContext(AuthContext);
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
      androidClientId,
      offlineAccess: true
    });
  }, [webClientId, androidClientId]);

  const toast = (errorMessage) => {
    Toast.show({
      type: 'error',
      text1: errorMessage,
      visibilityTime: 2000
    });
  };

  const signIn = async () => {
    try {
      setAuthenticating(true);
      const googleResponse = await GoogleSignin.hasPlayServices();
      if (googleResponse) {
        const userInfo = await GoogleSignin.signIn();
        const userTokens = await GoogleSignin.getTokens();
        const data = {
          info: userInfo.user,
          token: userTokens.accessToken
        };
        const token = await googleApi(data);
        if (token.message) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          toast(token.message);
          setAuthenticating(false);
        } else {
          try {
            logIn(token.data.token);
            const user = await fetchProfile();
            saveUserData(JSON.stringify(user.data));
            setAuthenticating(false);
          } catch (error) {
            setAuthenticating(false);
            toast(error);
          }
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        toast('User Cancelled Google Login');
        setAuthenticating(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        toast('Signing In');
        setAuthenticating(false);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        toast('Play Services Not Available or Outdated');
        setAuthenticating(false);
      } else {
        toast('Google Authentication Failed');
        setAuthenticating(false);
      }
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient style={styles.container} colors={[Colors.cornFlowerBlue, Colors.secondary]}>
        <View style={styles.title}>
          <Text style={styles.titleText}>TripPlanner</Text>
        </View>
        <View>
          <Image
            source={require('../assets/images/logo.png')}
            style={{ width: 300, height: 200, resizeMode: 'contain' }}
            imageStyle={{ borderRadius: 16 }}
          />
        </View>
        <Text style={styles.caption}>Life&apos;s an Adventure—Plan It!</Text>
        <View style={styles.infoHolder}></View>
        <View style={styles.buttonHolder}>
          {authenticating ? (
            <TouchableOpacity style={styles.button}>
              <ActivityIndicator size={'small'} color={Colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <GoogleIcon name="google" size={20} color={Colors.white} />
              <Text style={styles.buttonText}>Google</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.info}>LogIn or SignUp, Using Google</Text>
      </LinearGradient>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    justifyContent: 'center',
    marginBottom: 50
  },
  text: {
    fontSize: 40,
    fontWeight: '800',
    //fontStyle: 'italic',
    color: Colors.black
  },
  titleText: {
    fontSize: 40,
    fontWeight: '800',
    fontStyle: 'italic',
    color: Colors.black
  },
  caption: {
    paddingTop: 0,
    fontSize: 20,
    fontWeight: '500',
    color: Colors.black
  },
  infoHolder: {
    marginTop: 80,
    marginBottom: 20
  },
  info: {
    color: Colors.darkgrey,
    fontSize: 16,
    paddingVertical: 20
  },
  buttonHolder: {
    marginVertical: 5
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    width: 150,
    backgroundColor: Colors.cornFlowerBlue,
    borderRadius: 26,
    paddingHorizontal: 30,
    paddingVertical: 14
  },
  buttonText: {
    fontSize: 18,
    paddingLeft: 16,
    color: Colors.white
  }
});

export default StartScreen;
