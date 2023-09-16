import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import StartScreen from '../screens/StartScreen';
import { AuthContext } from '../context/AuthContext';

const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!isAuthenticated && <StartScreen />}
      {isAuthenticated && <MainStack />}
    </NavigationContainer>
  );
};

export default Routes;
