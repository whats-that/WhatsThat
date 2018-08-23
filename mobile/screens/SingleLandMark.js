import React from 'react';
import { Text, View, TextInput, Button, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Rating } from 'react-native-elements'
import axios from 'axios';

export default class SingleLandMark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acitivityIndicatorIsVisible: true
    }
    this.update = this.update.bind(this)
  }

  async componentDidMount() {
    const res = await axios.get(
      `http://172.16.23.112:8080/api/landmark/id/${
      this.props.navigation.state.params.id
      }`
    );
    this.setState({
      name: res.data.name,
      date: res.data.createdAt.slice(0, 10),
      rating: res.data.rating,
      comment: res.data.comment,
      image: res.data.image,
      acitivityIndicatorIsVisible: false
    });
  }

  async update() {
    axios.put(`http://172.16.23.112:8080/api/landmark/id/${
      this.props.navigation.state.params.id
    }`)
  }

  render() {
    if (this.state.acitivityIndicatorIsVisible) {
      return <ActivityIndicator style={{ width: '100%', height: '100%' }} />
    } else {
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
            <Image style={{
              width: 300,
              height: 300,
              resizeMode: Image.resizeMode.contain,
            }}
              source={{ uri: `data:image/png;base64,${this.state.image}` }} />
            <Text>{this.state.name}</Text>
            <Text>Visited on {this.state.date}</Text>
            <Rating
              type='star'
              startingValue={this.state.rating}
              onFinishRating={rating => this.setState({ rating })}
            />
            <Text>Comment</Text>
            <TextInput
              style={{
                height: 40,
                width: 300,
                borderColor: 'black',
                borderWidth: 1,
                textAlign: 'center',
              }}
              onChangeText={comment => this.setState({ comment })}
              value={this.state.comment}
            />
            <Button onPress={this.update} title="Submit review" />
          </View>
        </ScrollView>
      )
    }
  }
}
