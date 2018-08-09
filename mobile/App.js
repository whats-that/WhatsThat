import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraView from './Components/Camera';

export default class App extends React.Component {
  render() {
    return (
      // <CameraView />
      <Text>Here's some text. Commented out the cameraview component for commit</Text>
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
