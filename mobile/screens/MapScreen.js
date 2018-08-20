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

  async componentDidMount() {
    this.setState({ loading: true });
    const userId = await AsyncStorage.getItem('userId');
    const latitude = await AsyncStorage.getItem('latitude');
    const longitude = await AsyncStorage.getItem('longitude');
    console.log(longitude);
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userCurrentLandmark !== prevState.userCurrentLandmark) {
      return {
        region: {
          latitude: nextProps.userCurrentLandmark.coordinates[0],
          longitude: nextProps.userCurrentLandmark.coordinates[1],
        },
      };
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   // Any time the current user changes,
  //   // Reset any parts of state that are tied to that user.
  //   // In this simple example, that's just the email.
  //   if (props.userID !== state.prevPropsUserID) {
  //     return {
  //       prevPropsUserID: props.userID,
  //       email: props.defaultEmail,
  //     };
  //   }
  //   return null;
  // }

  // async componentWillReceiveProps(nextProps) {
  //   if (nextProps.userCurrentLandmark !== this.props.userCurrentLandmark) {
  //     this.setState({
  //       region: {
  //         latitude: nextProps.userCurrentLandmark.coordinates[0],
  //         longitude: nextProps.userCurrentLandmark.coordinates[1],
  //         latitudeDelta: 0.09,
  //         longitudeDelta: 0.04,
  //       },
  //     });
  //   }
  // }

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
        <MapView style={{ flex: 1 }} region={this.state.region}>
          {this.props.userCurrentLandmark && (
            <MapView.Marker
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
              }}
              title={this.props.userCurrentLandmark.name}
            />
          )}
        </MapView>
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
