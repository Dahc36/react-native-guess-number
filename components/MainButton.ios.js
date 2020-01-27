import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import { primary } from '../constants/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: primary,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

function MainButton({ children, onPress }) {
  return (
    <TouchableOpacity onPress={e => onPress(e)}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default MainButton;
