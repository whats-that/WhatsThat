import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { TabBarIOS } from 'react-native';
import { WebBrowser, Audio } from 'expo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

class AnalysisScreen extends React.Component {
  static navigationOptions = {
    title: 'WhatsThat Analysis',
  };

  async makeVoice(soundObject) {
    // var soundObject = new Audio.Sound();
    console.log('make voice start ...');
    try {
      await soundObject.unloadAsync();
      await soundObject.loadAsync(require('./out.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (err) {
      console.log(err); // An error occurred!
    }
  }
  async stopVoice(soundObject) {
    try {
      await soundObject.stopAsync();
    } catch (err) {
      console.log(err); // An error occurred!
    }
  }

  async pauseVoice(soundObject) {
    try {
      await soundObject.pauseAsync();
    } catch (err) {
      console.log(err); // An error occurred!
    }
  }

  render() {
    console.log(this.props.navigation.state.params)
    var soundObject = new Audio.Sound();
    return (<View><Text></Text></View>)
  }
}
const mapState = state => ({

})
const mapDispatch = dispatch => ({

})
export default connect(mapState, mapDispatch)(AnalysisScreen)
