/*
  delete : if not used
*/
import React from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';

import CameraScreen from './CameraScreen';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return <CameraScreen {...this.props} navigation={this.props.navigation} />;
  }
}
