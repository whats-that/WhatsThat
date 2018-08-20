import React from 'react'
import { Text, View, Image } from 'react-native'
import { Rating } from 'react-native-elements'

export default class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: props.rating,
      price: props.price,
      image: props.image,
      name: props.name
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Image
          style={{width: 250, height: 250}}
          source={{uri: this.state.image}}
        />
        <Text>{this.state.name}</Text>
        <Text>{this.state.rating} Stars</Text>
        <Text>Price: {this.state.price}</Text>
      </View>
    )
  }
}
