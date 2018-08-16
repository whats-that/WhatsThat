import React from 'react'
import { Text, View, Button } from 'react-native'
import axios from 'axios'

export default class PastLandMarks extends React.Component {
  constructor() {
    super()
    this.state = []
  }
  
  // async componentDidMount() {
  //   const res = await axios.get('/server')
  //   this.setState(res.data)
  // }

  landmarkRender(landmark) {
    <View key={landmark.id}>
      <Text>{landmark.name}</ Text>
      <Text>{landmark.rating} Stars</ Text>
      <Button title={
          landmark.comment ? 
          'Edit review' : 
          'Review'
        } onPress={() => console.log(landmark)}> {/* will redirect to singlelandmark*/}
        
      </Button>
    </ View>
  }

  render() {
    if(this.state.length){
      return (
        <View style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {this.state.map(landmark => {
            return this.landmarkRender(landmark)
          })}
        </View>
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