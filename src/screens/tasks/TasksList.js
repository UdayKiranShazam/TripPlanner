import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import Header from '../../components/Header';
import Toast from 'react-native-toast-message';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RightSwipe from '../../components/RightSwipe';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import { fetchDeleteTask, fetchTasks } from '../../apis/tasks';
import TaskCard from '../../components/TaskCard';
import moment from 'moment';

const TasksList = ({ navigation, route }) => {
  const trip = route.params?.trip;
  const [selectedId] = useState(trip.id);
  const [tasksList, setTasksList] = useState('');
  const [cardRow, setCardRow] = useState([]);
  const [prevOpenCard, setPrevOpenCard] = useState(null);
  const isFocused = useIsFocused();
  const sheetRef = useRef(null);
  const [taskId, setTaskId] = useState();
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getTasksList();
    setCardRow([]);
  }, []);

  useEffect(() => {
    if (isFocused && prevOpenCard !== null) {
      prevOpenCard.close();
      getTasksList();
    } else {
      getTasksList();
    }
  }, [navigation, isFocused]);

  const toast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
      visibilityTime: 2000
    });
  };

  const onEdit = async (task) => {
    const date = task.date;
    const changedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    task.date = changedDate;
    navigation.navigate('Addtask', {
      task,
      edit: true
    });
  };

  const onAdd = () => {
    navigation.navigate('Addtask', {
      id: trip.id,
      edit: false
    });
  };

  const handleOpenSheet = (item) => {
    setTaskId(item.id);
    sheetRef.current?.open();
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
    prevOpenCard.close();
  };

  const onDelete = async () => {
    try {
      setLoader(true);
      const response = await fetchDeleteTask({ id: taskId });
      if (response.status) {
        setLoader(false);
        handleCloseSheet();
        toast('success', response.message);
        getTasksList();
      } else {
        toast('error', response.message);
      }
    } catch (err) {
      toast('error', err.message);
    }
  };

  const getTasksList = async () => {
    try {
      setLoad(true);
      const response = await fetchTasks(selectedId);
      if (response.status) {
        setLoad(false);
        setTasksList(response.data);
      } else {
        toast('error', response.message);
        setLoad(false);
      }
    } catch (err) {
      toast('error', err.message);
      setLoad(false);
    }
  };

  const closeCard = async (index) => {
    if (prevOpenCard && prevOpenCard !== cardRow[index]) {
      await prevOpenCard.close();
    }
    setPrevOpenCard(cardRow[index]);
  };

  return (
    <View style={styles.container}>
      <Header
        title={`${trip?.tripname} Tasks`}
        navigation={navigation}
        onPress={onAdd}
        show={true}
      />
      {load && tasksList == '' && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={Colors.cornFlowerBlue} />
        </View>
      )}
      {!load && tasksList == '' && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.noText}>No Tasks</Text>
          <Text style={styles.noInfo}>Add one by clicking the above button</Text>
        </View>
      )}
      {!load && tasksList != '' && (
        <GestureHandlerRootView style={styles.cardCtn}>
          {/* <Text style={{textAlign:'right',paddingRight: 25}}>{'<<<'}</Text> */}
          <FlatList
            data={tasksList}
            key={(item) => item.id}
            renderItem={({ item, index }) => {
              return (
                <Swipeable
                  key={`${item.id}-${index}`}
                  ref={(ref) => (cardRow[index] = ref)}
                  friction={2}
                  rightThreshold={10}
                  overshootRight={false}
                  onSwipeableOpen={() => {
                    closeCard(index);
                  }}
                  renderRightActions={(progress, dragX) => (
                    <RightSwipe
                      progress={progress}
                      dragX={dragX}
                      onEdit={() => onEdit(item)}
                      onDelete={() => handleOpenSheet(item)}
                      showEdit={true}
                      showDelete={true}
                    />
                  )}>
                  <Pressable onPress={() => onEdit(item)}>
                    <TaskCard
                      title={item.taskname}
                      date={item.date}
                      name={item.completed === true ? 'checkmark-done' : 'close-circle-outline'}
                      color={item.completed === true ? Colors.limegreen : Colors.red}
                    />
                  </Pressable>
                </Swipeable>
              );
            }}
          />
        </GestureHandlerRootView>
      )}
      <RBSheet
        ref={sheetRef}
        height={200}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent'
          },
          draggableIcon: {
            backgroundColor: Colors.lightgrey
          }
        }}>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={styles.deleteInfo}>Are you sure you want to delete?</Text>
        </View>
        <View style={styles.sheetDisplay}>
          <View style={styles.sheetDisplayButtons}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.Warning }]}
              onPress={handleCloseSheet}>
              <Text style={[styles.buttonText, { color: Colors.white }]}>Cancel</Text>
            </TouchableOpacity>

            {loader ? (
              <TouchableOpacity style={[styles.button, { backgroundColor: Colors.cornFlowerBlue }]}>
                <ActivityIndicator size="small" color={Colors.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: Colors.cornFlowerBlue }]}
                onPress={onDelete}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </RBSheet>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  cardCtn: {
    marginTop: 20,
    width: '100%'
  },
  noText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.grey
  },
  noInfo: {
    fontSize: 16,
    color: Colors.grey
  },
  deleteInfo: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.black
  },
  sheetDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
  },
  sheetDisplayButtons: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '30%',
    height: 45,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold'
  }
});

export default TasksList;
