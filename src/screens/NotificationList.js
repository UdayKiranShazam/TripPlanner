import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fetchCompletedTasks } from '../apis/tasks';
import TaskCard from '../components/TaskCard';
import { useIsFocused } from '@react-navigation/native';
import Header from '../components/Header';

const NotificationList = ({ navigation }) => {
  const [tasksList, setTasksList] = useState('');
  const [load, setLoad] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getTasksCompletedList();
    }
  }, [navigation, isFocused]);

  const getTasksCompletedList = async () => {
    try {
      setLoad(true);
      const response = await fetchCompletedTasks();
      if (response.status) {
        setTasksList(response.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (err) {
      setLoad(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Completed Tasks'} navigation={navigation} />
      {!load && tasksList == '' ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.noText}>No Tasks Completed</Text>
        </View>
      ) : (
        <GestureHandlerRootView style={styles.cardCtn}>
          <FlatList
            data={tasksList}
            key={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TaskCard
                  title={item.taskname}
                  date={item.date}
                  hide={true}
                  name={item.completed === true ? 'checkmark-done' : 'close-circle-outline'}
                  color={item.completed === true ? Colors.limegreen : Colors.red}
                />
              );
            }}
          />
        </GestureHandlerRootView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  noText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.grey
  },
  cardCtn: {
    marginTop: 30,
    width: '100%'
  }
});

export default NotificationList;
