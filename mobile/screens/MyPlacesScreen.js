import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Button,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import { Rating } from 'react-native-elements'
import axios from 'axios';

export default class MyPlacesScreen extends React.Component {
  static navigationOptions = {
    title: 'My Places',
  };
  constructor() {
    super();
    this.state = {
      landmarks: [],
    };
  }

  async componentDidMount() {
    const id = await AsyncStorage.getItem('userId')
    const res = await axios.get(`http://whatsthat-capstone.herokuapp.com/api/users/${id}/history`)
    this.setState({landmarks: res.data})
  }

  landmarkRender(landmark) {
    return (
      <View 
        key={landmark.id}
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{landmark.name}</Text>
        <Rating 
          readonly
          type='star'
          startingValue={landmark.rating}
        />
        <Button
          title={landmark.comment ? 'Edit review' : 'Review'}
          onPress={() =>
            this.props.navigation.navigate('MyLandmark', { id: landmark.id })
          }
        />
      </View>
    );
  }

  render() {
    if (this.state.landmarks.length) {
      return (
        <ScrollView style={{backgroundColor: 'white'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {this.state.landmarks.map(landmark => {
              return this.landmarkRender(landmark);
            })}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white'
            }}
          >
            <Text>
              You have not visited any landmarks. Maybe you should travel some
              more.
            </Text>
          </View>
        </ScrollView>
      );
    }
  }
}
