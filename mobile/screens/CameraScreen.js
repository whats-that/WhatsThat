import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Permissions } from 'expo';
import NoPermission from './components/NoPermission';
import PreviewImage from './components/PreviewImage';
import CameraComponent from './components/CameraComponent';

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      newPhotos: false,
      previewImage: false,
      previewSource: '',
      photoBlob: {},
      userId: '',
    };
    this.exitPicture = this.exitPicture.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    const userId = await AsyncStorage.getItem('userId');
    this.setState({ userId });
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


