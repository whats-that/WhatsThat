import React from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import axios from 'axios'

export default class SingleLandMarks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      landmark: {},
      rating: 5,
      comment: ''
    }
  }
  
  async componentDidMount() {
    const res = await axios.get(`/server/${this.props.id}`)
    this.setState({
      landmark: res.data,
      rating: res.data.rating,
      comment: res.data.comment
    })
  }

  render() {
    return (
      <View>
        <Text>{this.state.name}</Text>
        {/* <FormLabel>Stars</FormLabel>
        <FormInput onChangeText={someFunction}/>
        <FormLabel>Comment</FormLabel>
        <FormInput onChangeText={someFunction}/> */}
      </View>
    )
  }
}