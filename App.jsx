import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { Colors } from './src/constants/Colors';
import Routes from './src/navigation/Routes';
import { AuthContextProvider } from './src/context/AuthContext';

const App = () => {

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
});

export default App;
