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
import axios from 'axios'

class MyPlacesScreen extends React.Component {
  static navigationOptions = {
    title: 'My Places',
  };

  constructor() {
    super()
    this.state = {
      landmarks: []
    }
  }
  
  async componentDidMount() {
    const res = await axios.get('http://172.16.23.255:8080/api/server/history')
    console.log('res', res.data)
    this.setState({landmarks: res.data})
  }

  landmarkRender(landmark) {
    <View key={landmark.id}>
      <Text>{landmark.name}</ Text>
      <Text>{landmark.rating} Stars</ Text>
      <Button title={
          landmark.comment ? 
          'Edit review' : 
          'Review'
        } onPress={() => this.props.navigation.navigate('MyLandmark')}> {/* will redirect to singlelandmark*/}
        
      </Button>
    </ View>
  }

  render() {
    console.log('landmarks', this.state.landmarks)
    if(this.state.landmarks.length){
      return (
        <ScrollView style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {this.state.landmarks.map(landmark => {
            return this.landmarkRender(landmark)
          })}
        </ScrollView>
      )
    } else {
      return (
        <View style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text>You have not visited any landmarks. Maybe you should travel some more.</ Text>
        </View>
      )
    }
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(
  mapState,
  mapDispatch
)(MyPlacesScreen);
