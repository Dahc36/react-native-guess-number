import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';

import { maxValue, minValue } from '../constants/gameParams';
import defaultStyles from '../constants/styles';
import { getRandomInt } from '../constants/utils';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 10 : 3,
    width: 300,
    maxWidth: '80%',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  list: {
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});

function renderListItem({ item: guess }) {
  return (
    <View key={guess.round} style={styles.listItem}>
      <Text style={defaultStyles.bodyText}>#{guess.round}</Text>
      <Text style={defaultStyles.bodyText}>{guess.value}</Text>
    </View>
  );
}

function GameScreen({ number, onGuess }) {
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [guess, setGuess] = useState(getRandomInt(maxValue, minValue));
  const [guesses, setGuesses] = useState([]);
  const greatestRef = useRef(maxValue);
  const smallestRef = useRef(minValue);

  useEffect(() => {
    function updateLayout({ window }) {
      setDeviceHeight(window.height);
      setDeviceWidth(window.width);
    }
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  useEffect(() => {
    if (number === guess) {
      onGuess(guesses.length + 1);
    } else {
      setGuesses(list => [
        { value: guess, round: (list.length + 1).toString() },
        ...list,
      ]);
    }
  }, [number, guess]);

  function handleCheat() {
    Alert.alert('No no no no', "Don't lie!", [{ text: 'Sorry!', style: 'cancel' }]);
  }

  function handleGreater() {
    if (number < guess) {
      return handleCheat();
    }
    smallestRef.current = guess + 1;
    setGuess(getRandomInt(greatestRef.current, smallestRef.current));
  }

  function handleLower() {
    if (number > guess) {
      return handleCheat();
    }
    greatestRef.current = guess - 1;
    setGuess(getRandomInt(greatestRef.current, smallestRef.current));
  }

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.titleText}>Computer's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={handleLower}>
            <Ionicons color="white" name="md-remove" size={24} />
          </MainButton>
          <NumberContainer>{guess}</NumberContainer>
          <MainButton onPress={handleGreater}>
            <Ionicons color="white" name="md-add" size={24} />
          </MainButton>
        </View>
        <View
          style={[styles.listContainer, { width: deviceWidth > 350 ? '60%' : '80%' }]}
        >
          <FlatList
            contentContainerStyle={styles.list}
            data={guesses}
            keyExtractor={item => item.round}
            renderItem={renderListItem}
          />
          {/* <ScrollView contentContainerStyle={styles.list}>
          {guesses.map(guess => renderListItem({ item: guess }))}
        </ScrollView> */}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.titleText}>Computer's Guess</Text>
      <NumberContainer>{guess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={handleLower}>
          <Ionicons color="white" name="md-remove" size={24} />
        </MainButton>
        <MainButton onPress={handleGreater}>
          <Ionicons color="white" name="md-add" size={24} />
        </MainButton>
      </Card>
      <View style={[styles.listContainer, { width: deviceWidth > 350 ? '60%' : '80%' }]}>
        <FlatList
          contentContainerStyle={styles.list}
          data={guesses}
          keyExtractor={item => item.round}
          renderItem={renderListItem}
        />
        {/* <ScrollView contentContainerStyle={styles.list}>
          {guesses.map(guess => renderListItem({ item: guess }))}
        </ScrollView> */}
      </View>
    </View>
  );
}

export default GameScreen;
