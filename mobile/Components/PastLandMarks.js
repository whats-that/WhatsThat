import React from 'react'
import { Text, View, Button } from 'react-native'
import axios from 'axios'

export default class PastLandMarks extends React.Component {
  constructor() {
    super()
    this.state = []
  }
  
  async componentDidMount() {
    const res = await axios.get('/server')
    this.setState(res.data)
  }

  landmarkRender(landmark) {
    <View key={landmark.id}>
      <Text>{landmark.name}</ Text>
      <Text>{landmark.rating} Stars</ Text>
      <Button title='rating' onPress={}> {/* will redirect to singlelandmark*/}
        {
          landmark.comment ? 
          'Edit review' : 
          'Review'
        }
      </Button>
    </ View>
  }

  render() {
    if(this.state.length){
      return (
        <View>
          {this.state.map(landmark => {
            return this.landmarkRender(landmark)
          })}
        </View>
      )
    } else {
      return <Text>You have not visited any landmarks. Maybe you should travel some more.</ Text>
    }
  }
}