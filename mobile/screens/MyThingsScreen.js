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

class MyThingsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Things',
  };

  render() {
    return (
      <View>
        <Text>My Things</Text>
      </View>
    );
  }
}

const mapState = state => ({});
const mapDispatch = dispatch => ({});

export default connect(
  mapState,
  mapDispatch
)(MyThingsScreen);
