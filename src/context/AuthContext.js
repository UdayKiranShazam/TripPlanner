import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { fetchProfile } from '../apis/user';

export const AuthContext = createContext({
  user: {},
  isAuthenticated: false,
  logIn: () => {},
  saveUserData: () => {},
  logOut: () => {}
});

export const AuthContextProvider = ({ children }) => {
  const [authtoken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        return setAuthToken(storedToken);
      }
    }
    fetchToken();
    async function fetchUser() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        try {
          const user = await fetchProfile();
          if (user.data) {
            return setUserData(JSON.stringify(user.data));
          } else {
            return logOut();
          }
        } catch (error) {
          return logOut();
        }
      }
    }

    fetchUser();
  }, []);

  const logIn = async (token) => {
    try {
      setAuthToken(token);
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log('Auth Context signIn: Error at asyncstorage');
    }
  };

  const saveUserData = (user) => {
    try {
      if (user) {
        setUserData(user);
      }
    } catch (e) {
      console.log('Auth Context saveUser: Error at asyncstorage');
    }
  };

  const logOut = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      setAuthToken(null);
      setUserData(null);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } else {
      try {
        setAuthToken(null);
        setUserData(null);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
      } catch (e) {
        console.log('Auth Context signOut: Error at asyncstorage');
      }
    }
  };

  const value = {
    user: userData,
    isAuthenticated: !!authtoken,
    logIn,
    saveUserData,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
