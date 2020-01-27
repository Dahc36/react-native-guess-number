import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    // Android
    elevation: 5,
    // IOS
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    padding: 20,
  },
});

function Card({ children, style }) {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
}

export default Card;
