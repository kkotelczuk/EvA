/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import Syncano from 'syncano-client'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const s = new Syncano('empty-glade-8302')

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="login"
        />
        <TextInput
          placeholder="password"
          type="password"
        />
        <Button
          title="Login"
          color="#841584"
          onPress={() => s('user-auth/login', {username: 'joe.doe@usa.us', password: 'qwerty'}).then(console.log)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
