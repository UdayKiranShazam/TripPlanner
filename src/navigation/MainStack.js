import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TripsList from '../screens/trips/TripsList';
import AddTrip from '../screens/trips/AddTrip';
import TasksList from '../screens/tasks/TasksList';
import AddTask from '../screens/tasks/AddTask';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tripslist" component={TripsList} />
      <Stack.Screen name="Addtrip" component={AddTrip} />
      <Stack.Screen name="Tasklist" component={TasksList} />
      <Stack.Screen name="Addtask" component={AddTask} />
    </Stack.Navigator>
  );
};

export default MainStack;