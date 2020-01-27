import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { secondary } from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: secondary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: secondary,
    fontSize: 22,
  },
});

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
}

export default NumberContainer;
