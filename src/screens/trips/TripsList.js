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
import Material from 'react-native-vector-icons/MaterialIcons';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { fetchTrips } from '../../apis/trips';
import Toast from 'react-native-toast-message';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RightSwipe from '../../components/RightSwipe';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import RadioButton from '../../components/RadioButton';

const TripsList = ({ navigation, route }) => {
  const categoryid = route.params?.id;
  const [tripsList, setTripsList] = useState('');
  const [cardRow, setCardRow] = useState([]);
  const [prevOpenCard, setPrevOpenCard] = useState(null);
  const [selectedId, setSelectedId] = useState(categoryid ? categoryid : 1);
  const isFocused = useIsFocused();
  const sheetRef = useRef(null);
  const [load, setLoad] = useState(false);

  const categoryList = [
    { id: 1, label: 'Camping' },
    { id: 2, label: 'Surfing' },
    { id: 3, label: 'Dining' },
    { id: 4, label: 'Road Trip' },
    { id: 5, label: 'Theme parks' },
    { id: 6, label: 'Wildlife' },
    { id: 7, label: 'Hiking' },
    { id: 8, label: 'Shopping' }
  ];

  useEffect(() => {
    getTripsList();
    setCardRow([]);
  }, []);

  useEffect(() => {
    if (isFocused && prevOpenCard !== null) {
      prevOpenCard.close();
      getTripsList();
    } else {
      getTripsList();
    }
  }, [navigation, isFocused]);

  const toast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
      visibilityTime: 2000
    });
  };

  const closeCard = async (index) => {
    if (prevOpenCard && prevOpenCard !== cardRow[index]) {
      await prevOpenCard.close();
    }
    setPrevOpenCard(cardRow[index]);
  };

  const onEdit = (trip) => {
    navigation.navigate('Addtrip', {
      trip,
      edit: true
    });
  };

  const onAdd = () => {
    navigation.navigate('Addtrip', {
      id: selectedId,
      edit: false
    });
  };

  const handleOpenSheet = () => {
    sheetRef.current?.open();
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  const navToTasks = (trip) => {
    navigation.navigate('Tasklist', {
      trip: trip
    });
  };

  const getTrip = () => {
    return categoryList.filter((item) => item.id == selectedId).map((item) => item.label);
  };

  const setTripCategory = async (id) => {
    setSelectedId(id);
    try {
      setLoad(true);
      const response = await fetchTrips(id);
      if (response.status) {
        setLoad(false);
        setTripsList(response.data);
      } else {
        toast('error', response.message);
        setLoad(false);
      }
    } catch (err) {
      toast('error', err.message);
      setLoad(false);
    }
  };

  const getTripsList = async () => {
    try {
      const response = await fetchTrips(selectedId);
      if (response.status) {
        setLoad(false);
        setTripsList(response.data);
      } else {
        toast('error', response.message);
        setLoad(false);
      }
    } catch (err) {
      toast('error', err.message);
      setLoad(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={`${getTrip()} Trips`} navigation={navigation} />
      <View style={styles.dropdownCtn}>
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownView} onPress={handleOpenSheet}>
            <Text style={styles.dropdownText}>{getTrip()}</Text>
            <Material name={'arrow-drop-down'} color={Colors.grey} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addbtn} onPress={onAdd}>
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
      {tripsList != '' && (
        <Text style={{ fontSize: 12, textAlign: 'right', paddingRight: 25 }}>{'<<swipe'}</Text>
      )}
      {load && tripsList == '' && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={Colors.cornFlowerBlue} />
        </View>
      )}
      {!load && tripsList == '' && (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 250 }}>
          <Text style={styles.noText}>No Trips</Text>
          <Text style={styles.noInfo}>Add one by clicking the above ADD button</Text>
        </View>
      )}
      {!load && tripsList != '' && (
        <GestureHandlerRootView style={styles.cardCtn}>
          <FlatList
            data={tripsList}
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
                      showEdit={true}
                      showDelete={false}
                    />
                  )}>
                  <Pressable onPress={() => navToTasks(item)}>
                    <Card
                      title={item.tripname}
                      text={item.destination}
                      startdate={item.startdate}
                      enddate={item.enddate}
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
        height={460}
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
        <FlatList
          data={categoryList}
          ListFooterComponent={<View style={styles.bottomMargin} />}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  setTripCategory(item.id);
                  handleCloseSheet();
                }}>
                <View style={styles.sheetContainer}>
                  <Text style={styles.sheetText}>{item.label}</Text>
                  <RadioButton show={item.id === selectedId ? true : false} />
                </View>
              </Pressable>
            );
          }}
        />
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
  dropdownCtn: {
    marginTop: 20,
    alignItems: 'center'
  },
  dropdown: {
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    elevation: 10,
    height: 50,
    width: '60%',
    paddingHorizontal: 15,
    backgroundColor: Colors.white
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.darkgrey
  },
  addbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 20,
    height: 50,
    width: '28%',
    backgroundColor: Colors.white
  },
  addText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.cornFlowerBlue
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
  cardCtn: {
    marginTop: 4,
    width: '100%'
  },
  sheetDisplay: {
    padding: 10
  },
  sheetContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.lightgrey
  },
  sheetText: {
    fontSize: 16,
    color: Colors.black
  },
  bottomMargin: {
    marginBottom: 60
  }
});

export default TripsList;

{
  /*
       
*/
}
