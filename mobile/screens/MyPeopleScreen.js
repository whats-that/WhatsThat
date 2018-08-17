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

class MyPeopleScreen extends React.Component {
  static navigationOptions = {
    title: 'My People',
  };

  render() {
    return (
      <View>
        <Text>My People</Text>
      </View>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(
  mapState,
  mapDispatch
)(MyPeopleScreen);
