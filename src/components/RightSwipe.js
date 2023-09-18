import React from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RightSwipe = ({ dragX, onEdit, onDelete, showEdit, showDelete }) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View style={{ transform: [{ scale: scale }] }}>
      <View style={styles.showIcons}>
        {showEdit && (
          <Icon
            name="square-edit-outline"
            size={35}
            color={Colors.yellowgreen}
            onPress={onEdit}
            style={styles.icon}
          />
        )}
        <Text style={{ paddingHorizontal: 6 }} />
        {showDelete && (
          <Icon name="delete" size={35} color={Colors.red} onPress={onDelete} style={styles.icon} />
        )}
      </View>
    </Animated.View>
  );
};

export default RightSwipe;

const styles = StyleSheet.create({
  showIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 10,
    marginTop: 8
  },
  seperateIcons: {
    margin: 6
  },
  icon: {
    margin: 6
  }
});
