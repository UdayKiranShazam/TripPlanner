import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

const CategoryBox = ({ source, category }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.Ctn}>
        <ImageBackground source={source} style={styles.imgCtn} imageStyle={styles.imgStyle}>
          <Text style={styles.text}>{category}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: '45%'
  },
  Ctn: {
    width: '100%',
    height: 130,
    elevation: 5,
    borderRadius: 16,
    backgroundColor: Colors.white
  },
  imgCtn: {
    width: '100%',
    height: 130,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 16
  },
  text: {
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
    alignItems: 'flex-end'
  }
});

export default CategoryBox;
