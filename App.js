import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Header from './components/Header';
import GameScreen from './screens/Game';
import StartGameScreen from './screens/StartGame';
import GameOverScreen from './screens/GameOver';

function fetchFonts() {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default function App() {
  const [guessCount, setGuessCount] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState('START');
  const [userNumber, setUserNumber] = useState();

  if (loading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={err => console.log(err)}
        onFinish={() => setLoading(false)}
      />
    );
  }

  function handleGuess(newGuessCount) {
    setGuessCount(newGuessCount);
    setScreen('OVER');
  }

  function handleNewGame() {
    setScreen('START');
  }

  function handleStart(number) {
    setUserNumber(number);
    setScreen('GAME');
  }

  function renderScreen() {
    switch (screen) {
      case 'START':
        return <StartGameScreen onStart={handleStart} />;
      case 'GAME':
        return <GameScreen number={userNumber} onGuess={handleGuess} />;
      case 'OVER':
        return (
          <GameOverScreen
            guessCount={guessCount}
            number={userNumber}
            onNewGame={handleNewGame}
          />
        );
      default:
        return <Text>Oops..</Text>;
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
      {renderScreen()}
    </SafeAreaView>
  );
}
