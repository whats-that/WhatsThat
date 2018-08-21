import React from 'react';
import { Text, View, TextInput, Button, Image } from 'react-native';
import { Rating } from 'react-native-elements'
import axios from 'axios';

export default class SingleLandMark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      rating: 5,
      comment: '',
      image: ''
    };
    this.update = this.update.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get(
      `http://whatsthat-capstone.herokuapp.com/api/landmark/id/${
        this.props.navigation.state.params.id
      }`
    );
    this.setState({
      name: res.data.name,
      date: res.data.createdAt,
      rating: res.data.rating,
      comment: res.data.comment,
    });
  }

  update() {
    console.log(this.state);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image style={{
          width: 300,
          height: 300,
          resizeMode: Image.resizeMode.contain,
        }}
          source={{uri:`data:image/png;base64,${this.state.image}`}}/>
        <Text>{this.state.name}</Text>
        <Text>Stars</Text>
        <TextInput
          style={{
            height: 40,
            width: 40,
            borderColor: 'black',
            borderWidth: 1,
            textAlign: 'center',
          }}
          onChangeText={rating => this.setState({ rating: Number(rating) })}
          value={'' + this.state.rating}
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
    );
  }
}
