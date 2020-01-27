import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';

import { primary, secondary } from '../constants/colors';
import { maxValue, minValue } from '../constants/gameParams';
import DefaultStyles from '../constants/styles';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    width: '100%',
  },
  confirmationContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    textAlign: 'center',
    width: 50,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
});

function StartGameScreen({ onStart }) {
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);
  const [confirmed, setConfirmed] = useState(false);
  const [selection, setSelection] = useState();
  const [value, setValue] = useState('');

  useEffect(() => {
    function updateLayout({ window }) {
      setButtonWidth(window.width / 4);
    }
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  function handleChangeText(text) {
    setValue(text.replace(/[^0-9]/g, ''));
  }

  function handlePressConfirm() {
    const intValue = parseInt(value);
    if (Number.isNaN(intValue) || intValue < minValue || intValue > maxValue) {
      Alert.alert(
        'Invalid number!',
        `Number has to be between ${minValue} and ${maxValue}`,
        [{ text: 'Okay', style: 'destructive', onPress: handlePressReset }]
      );
      return;
    }
    Keyboard.dismiss();
    setSelection(intValue);
    setValue('');
    setConfirmed(true);
  }

  function handlePressReset() {
    setValue('');
    setConfirmed(false);
  }

  function handleStart() {
    onStart(selection);
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={{ ...DefaultStyles.titleText, ...styles.title }}>
              Start a New Game!
            </Text>
            <Card style={styles.inputContainer}>
              <Text style={DefaultStyles.bodyText}>Select a number</Text>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit={true}
                keyboardType="number-pad"
                maxLength={maxValue.toString().length}
                onChangeText={handleChangeText}
                style={styles.input}
                value={value}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button color={secondary} title="Reset" onPress={handlePressReset} />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button color={primary} title="Confirm" onPress={handlePressConfirm} />
                </View>
              </View>
            </Card>
            {confirmed && (
              <Card style={styles.confirmationContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selection}</NumberContainer>
                <MainButton onPress={handleStart}>START GAME</MainButton>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;
