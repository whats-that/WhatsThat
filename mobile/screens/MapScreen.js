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
    this.setState({ userId });
    await this.props.fetchUserLandmark(Number(this.state.userId));

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
    return null;
  }

  render() {
    const buttons = ['Popular', 'Eat'];
    const { selectedIndex } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 70 }}
        />

         <LandmarksNearMe navigation={this.props.navigation}/>}
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
