import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  AsyncStorage,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { Camera, Permissions, FileSystem } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
  renderers,
} from 'react-native-popup-menu';
const { SlideInMenu } = renderers;
import { createLandmark } from '../reducers/landmark';
import { createThing } from '../reducers/thing';
import CameraComponent from './components/CameraComponent';
import PreviewImage from './components/PreviewImage';
import NoPermission from './components/NoPermission';

class CameraScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      newPhotos: false,
      previewImage: false,
      previewSource: '',
      photoBlob: {},
      userId: '',
      textDetection: false,
      restaurantDetection: false,
      loading: false,
    };
    this.exitPicture = this.exitPicture.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    // header: null,
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: 'rgb(247, 247, 247)',
      },
      headerRight: (
        <MenuProvider>
          <Menu renderer={SlideInMenu}>
            <MenuTrigger>
              <Ionicons
                name={'ios-more'}
                size={33}
                style={{ marginRight: 40, color: 'rgb(72, 113, 224)' }}
              />
            </MenuTrigger>
            <MenuOptions
              style={{
                width: 100,
                height: 200,
                backgroundColor: 'transparent',
                top: 220,
                left: -40,
              }}
            >
              <MenuOption onSelect={() => params.setToggle('text')}>
                <Text style={{ color: 'red', fontSize: 25 }}>Text</Text>
              </MenuOption>
              <MenuOption onSelect={() => params.setToggle('noText')}>
                <Text style={{ color: 'blue', fontSize: 25 }}>Plain</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </MenuProvider>
      ),
    };
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    const userId = await AsyncStorage.getItem('userId');
    this.setState({ userId });
    this.setToggle = this.setToggle.bind(this);
    const { navigation } = this.props;
    navigation.setParams({ setToggle: this.setToggle });
  }

  setToggle(key) {
    if (key === 'text') this.setState({ textDetection: true, restaurantDetection: false });
    else if(key === 'restaurant') this.setState({textDetection: false, restaurantDetection: true})
    else this.setState({ textDetection: false, restaurantDetection: false });
  }
  
  async exitPicture() {
    await this.setState({
      previewImage: false
    });
  }
  
  async updateState(destinationUri, photo) {      //setState that is passable to child camera component
    await this.setState({
      previewImage: true,
      previewSource: destinationUri,
      newPhotos: true,
      photoBlob: photo,
    });
  }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <NoPermission />;
    } else {
      return this.state.previewImage ? <PreviewImage state={this.state} exitPicture={this.exitPicture} navigation={this.props.navigation} /> : <CameraComponent state={this.state} updateState={this.updateState}/>;
    }
  }
}

const mapState = state => ({});
const mapDispatch = dispatch => ({
  createLandmark: landmark => dispatch(createLandmark(landmark)),
  createThing: thing => dispatch(createThing(thing)),
  setSearchString: (searchString) => dispatch(setSearchString(searchString)),
});

export default connect(
  mapState,
  mapDispatch
)(CameraScreen);

const styles = StyleSheet.create({
  textToggle: {
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: 90 + '%',
  },
});
