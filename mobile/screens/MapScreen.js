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
} from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { fetchUserLandmark } from '../reducers/landmark';

class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 40.705137,
        longitude: -74.007624,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      },
      userId: '',
    };
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    console.log('userId is... ', userId);
    this.setState({ userId });
    await this.props.fetchUserLandmark(Number(this.state.userId));
    // console.log('user current landmark.. ', this.props.userCurrentLandmark);
    if (this.props.userCurrentLandmark.coordinates) {
      this.setState({
        region: {
          latitude: this.props.userCurrentLandmark.coordinates[0],
          longitude: this.props.userCurrentLandmark.coordinates[1],
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        },
      });
    }

  }

  render() {
    console.log('map screen this.props: ', this.props);
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 40,
            alignItems: 'center',
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white'
          }}
        >
          {/* <View> */}
            <Text style={{ fontSize: 17, marginLeft: 30, marginTop: 15 }}>Popular</Text>
          {/* </View> */}
          {/* <View> */}
            <Text style={{ fontSize: 17, marginTop: 15 }}>Eat</Text>
          {/* </View> */}
          {/* <View> */}
            <Text style={{ fontSize: 17, marginRight: 30, marginTop: 15 }}>People</Text>
          {/* </View> */}
        </View>
        <MapView style={{ flex: 1 }} region={this.state.region} />
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
