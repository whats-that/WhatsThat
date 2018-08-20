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
import Loader from './Loader';
import { createLandmark } from '../reducers/landmark';
import { createThing } from '../reducers/thing';
import searchString, {setSearchString} from '../reducers/searchString';

class CameraScreen extends React.Component {
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
      textDetection: false,
      loading: false,
    };
    this.takePicture = this.takePicture.bind(this);
    this.onPictureSaved = this.onPictureSaved.bind(this);
    this.usePicture = this.usePicture.bind(this);
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
    // FileSystem.makeDirectoryAsync(
    //   FileSystem.documentDirectory + 'photos'
    // ).catch(e => {
    //   console.log(e, 'Directory exists');
    // });

    const userId = await AsyncStorage.getItem('userId');
    this.setState({ userId });
    this.setToggle = this.setToggle.bind(this);
    const { navigation } = this.props;
    navigation.setParams({ setToggle: this.setToggle });
  }

  setToggle(key) {
    if (key === 'text') this.setState({ textDetection: true });
    else this.setState({ textDetection: false });
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
    this.props.setSearchString(passingData);
    this.props.navigation.navigate('Wiki');
  };

  goToAnalysis = data => {
    console.log('go to analysis... ');
    this.props.navigation.navigate('Analysis', { data });
  };

  goToTextAnalysis = text => {
    console.log('go to text analysis... ');
    this.props.navigation.navigate('Analysis', { text });
  };

  async usePicture() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      alert('process failure!')
    }, 5000);
    console.log(this.state.textDetection);
    // const imageFile = new File(this.state.previewSource)
    if (!this.state.textDetection) {
      console.log('2use picture for landmark detection....');
      const result = await axios.post(
        'http://172.16.21.118:8080/api/server/getDataFromGoogleAPI',
        this.state.photoBlob
      );
      var apiData = result.data;
      // console.log(apiData)
      var landmarkObj = {
        name: apiData.name,
        image: apiData.image,
        coordinates: apiData.coordinates,
        accuracy: apiData.accuracy,
      };
      landmarkObj.userId = Number(this.state.userId);

      const label = apiData.label.description;
      const label_r = apiData.label.score;
      const keywords = apiData.webEntities.map(el => el.description);
      const keywords_r = apiData.webEntities.map(el => el.score);
      console.log(apiData);
      const images = apiData.webImages.map(el => el.url);

      var thingObj = {
        label,
        label_r,
        keywords,
        keywords_r,
        images,
      };
      if (!this.state.userId) {
        thingObj.userId = 1
      }
      thingObj.userId = Number(this.state.userId);
      this.setState({ loading: false });
      if (result.data.name) {
        console.log('landmark exists');
        this.props.createLandmark(landmarkObj);
        this.props.createThing(thingObj);
        this.goToAnalysis(thingObj);
        this.goToWiki(result.data.name);
      } else {
        console.log('no landmark exists');
        this.props.createThing(thingObj);
        this.goToAnalysis(thingObj);
      }
    } else {
      console.log('use picture for text detection....');
      const result = await axios.post(
        'http://172.16.21.118:8080/api/server/textToVoice',
        this.state.photoBlob
      );
      var text = result.data;
      this.setState({ loading: false });
      this.goToTextAnalysis(text);
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return this.state.previewImage ? (
        <View style={{ flex: 1 }}>
          <Loader loading={this.state.loading} />
          <ImageBackground
            source={{ uri: this.state.previewSource }}
            resizeMode="cover"
            style={{ flex: 1, width: undefined, height: undefined }}
          >
            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'transparent',
                // opacity: 0.3,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ previewImage: false })}
                style={{ alignSelf: 'flex-end', paddingLeft: 10 }}
              >
                <Ionicons name="md-close-circle" size={60} color="#cc0000" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.usePicture}
                style={{ alignSelf: 'flex-end', paddingRight: 10 }}
              >
                <Ionicons
                  name="ios-arrow-dropright-circle"
                  size={60}
                  color="#00ffcc"
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : (
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
