import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';
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
      <View key={landmark.id}>
        <Text>{landmark.name}</Text>
        <Text>{landmark.rating} Stars</Text>
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
        <ScrollView
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.state.landmarks.map(landmark => {
            return this.landmarkRender(landmark);
          })}
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>
            You have not visited any landmarks. Maybe you should travel some
            more.
          </Text>
        </ScrollView>
      );
    }
  }
}
