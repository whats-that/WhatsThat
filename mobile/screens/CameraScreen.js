import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { Camera, Permissions, FileSystem } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import NoPermission from './components/NoPermission';
import PreviewImage from './components/PreviewImage';
import { createLandmark } from '../reducers/landmark';

class CameraScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      newPhotos: false,
      previewImage: false,
      previewSource: '',
      photoBlob: {},
      userId: '',
    };
    this.takePicture = this.takePicture.bind(this);
    this.onPictureSaved = this.onPictureSaved.bind(this);
    this.usePicture = this.usePicture.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    // FileSystem.makeDirectoryAsync(
    //   FileSystem.documentDirectory + 'photos'
    // ).catch(e => {
    //   console.log(e, 'Directory exists');
    // });

    const userId = await AsyncStorage.getItem('userId');
    this.setState({ userId });
  }

  async takePicture() {
    if (this.camera) {
      const blob = await this.camera.takePictureAsync({
        onPictureSaved: this.onPictureSaved,
        base64: true,
        quality: 0.1,
      });
    }
  }

  onPictureSaved = async photo => {
    let destinationUri = `photos/${Date.now()}.jpg`;
    const destinationPath = `${FileSystem.documentDirectory}${destinationUri}`;
    destinationUri = '/' + destinationPath.substring(8);
    await FileSystem.moveAsync({
      from: photo.uri,
      to: destinationPath,
    });
    await this.setState({
      previewImage: true,
      previewSource: destinationUri,
      newPhotos: true,
      photoBlob: photo,
    });
  };

  goToWiki = passingData => {
    console.log('hit gotoWiki....');
    this.props.navigation.navigate('Wiki', { keyword: passingData });
  };

  async usePicture() {
    // console.warn(this.state)
    // const imageFile = new File(this.state.previewSource)
    // console.log(this.state.photoBlob.base64.length)
    // const result = await axios.post('http://172.16.21.118:8080/api/server', this.state.photoBlob)
    const result = await axios.post(
      'http://172.16.23.255:8080/api/server/getDataFromGoogleAPI',
      this.state.photoBlob
    );
    console.log('this props... ', this.props);
    var landmarkObj = result.data;
    landmarkObj.userId = console.log(
      landmarkObj.name,
      landmarkObj.coordinates,
      landmarkObj.userId
    );

    landmarkObj.userId = Number(this.state.userId);

    this.props.createLandmark(landmarkObj);
    this.goToWiki(result.data.name);
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <NoPermission />;
    } else {
      return this.state.previewImage ? <PreviewImage image={this.state.previewImage} /> : (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignSelf: 'center',
              }}
            >
              <TouchableOpacity
                onPress={this.takePicture}
                style={{ alignSelf: 'flex-end' }}
              >
                <Ionicons name="ios-radio-button-on" size={70} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  createLandmark: landmark => dispatch(createLandmark(landmark)),
});

export default connect(
  mapState,
  mapDispatch
)(CameraScreen);
