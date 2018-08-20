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
    if (key === 'text') this.setState({ textDetection: true });
    else this.setState({ textDetection: false });
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
  };

  goToWiki = passingData => {
    this.props.navigation.navigate('Wiki', { keyword: passingData });
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
