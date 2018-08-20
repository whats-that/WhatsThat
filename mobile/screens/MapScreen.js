import React from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { fetchUserLandmark } from '../reducers/landmark';
import { ButtonGroup } from 'react-native-elements';
import LandmarksNearMe from './LandmarksNearMe';

class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      selectedIndex: 2,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const buttons = ['Popular', 'Eat', 'People'];
    const { selectedIndex } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 70 }}
        />
        <View
          style={{
            height: 40,
            alignItems: 'center',
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}
        >
          {/* <View> */}
          <Text style={{ fontSize: 17, marginLeft: 30, marginTop: 15 }}>
            Popular
          </Text>
          {/* </View> */}
          {/* <View> */}
          <Text style={{ fontSize: 17, marginTop: 15 }}>Eat</Text>
          {/* </View> */}
          {/* <View> */}
          <Text style={{ fontSize: 17, marginRight: 30, marginTop: 15 }}>
            People
          </Text>
          {/* </View> */}
        </View>
        <LandmarksNearMe navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapState = state => ({
  userCurrentLandmark: state.landmark[state.landmark.length - 1],
});

const mapDispatch = dispatch => ({
  fetchUserLandmark: userId => dispatch(fetchUserLandmark(userId)),
});

export default connect(
  mapState,
  mapDispatch
)(MapScreen);
