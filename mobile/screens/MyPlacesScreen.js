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
import { connect } from 'react-redux';

class MyPlacesScreen extends React.Component {
  static navigationOptions = {
    title: 'My Places',
  };

  render() {
    return (
      <View>
        <Text>My Places</Text>
      </View>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(
  mapState,
  mapDispatch
)(MyPlacesScreen);
