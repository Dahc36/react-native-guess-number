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
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

function MainButton({ children, onPress }) {
  const ButtonComponent =
    Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={e => onPress(e)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
}

export default MainButton;
