import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraView from './Components/Camera';
import CameraButton from './Components/CameraButton';


export default class App extends React.Component {
  render() {
    return (

      <View style={styles.container}>
        <Text>Welcome to WhatsThat!</Text>
        <CameraButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
