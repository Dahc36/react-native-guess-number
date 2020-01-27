import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import MainButton from '../components/MainButton';

import { primary } from '../constants/colors';
import defaultStyles from '../constants/styles';

const styles = StyleSheet.create({
  highlight: {
    color: primary,
    fontFamily: 'open-sans-bold',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'black',
    marginVertical: 10,
    overflow: 'hidden',
  },
  resultContainer: {
    marginTop: Dimensions.get('window').height > 550 ? 15 : 0,
    marginBottom: 15,
    width: Dimensions.get('window').width > 350 ? '75%' : '90%',
  },
  resultText: {
    fontSize: Dimensions.get('window').height > 550 ? 20 : 16,
    textAlign: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scroll: {
    flexGrow: 1,
  },
});

function GameOver({ guessCount, number, onNewGame }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.screen}>
        <Text style={defaultStyles.titleText}>The Game is Over!</Text>
        <View style={styles.imageContainer}>
          <Image
            // source={require('../assets/success.png')}
            resizeMode="cover"
            source={{
              uri:
                'https://media-exp1.licdn.com/dms/image/C561BAQEnj7gasurx9Q/company-background_10000/0?e=2159024400&v=beta&t=13wy2G7az1piJ4xXUoVbbVchcPP9YRHB_dp1cOQwxoA',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.resultContainer}>
          <Text style={{ ...defaultStyles.bodyText, ...styles.resultText }}>
            Your phone needed <Text style={styles.highlight}>{guessCount}</Text> rounds to
            guess the number
            <Text style={styles.highlight}> {number}</Text>
          </Text>
        </View>
        <MainButton onPress={onNewGame}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
}

export default GameOver;
