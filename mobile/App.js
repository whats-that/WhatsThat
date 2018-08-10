import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraView from './Components/Camera';
import CameraButton from './Components/CameraButton';
import WikipediaWebView from './Components/WikipediaWebView';


export default class App extends React.Component {

  render() {
    return (
      // <CameraView />
      <CameraButton />
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
