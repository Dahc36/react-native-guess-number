import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import { primary } from '../constants/colors';
import defaultStyles from '../constants/styles';

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAndroid: {
    backgroundColor: primary,
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? primary : 'white',
    fontSize: 18,
  },
});

function Header({ title }) {
  return (
    <View
      style={{
        ...styles.headerContainer,
        ...Platform.select({ android: styles.headerAndroid, ios: styles.headerIOS }),
      }}
    >
      <Text style={{ ...defaultStyles.titleText, ...styles.headerTitle }}>{title}</Text>
    </View>
  );
}

export default Header;
