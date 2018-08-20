import React from 'react'
import { Text, View, Button } from 'react-native'
import axios from 'axios'

export default class PastLandMarks extends React.Component {
  constructor() {
    super()
    this.state = {
      landmarks: []
    }
  }

  async componentDidMount() {
<<<<<<< HEAD
    const res = await axios.get('http://172.16.21.174:8080/api/server/history')
=======
    const res = await axios.get('http://172.16.21.118:8080/api/server/history')
>>>>>>> master
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
        } onPress={() => console.log(landmark)}> {/* will redirect to singlelandmark*/}

      </Button>
    </ View>
  }

  render() {
    console.log('landmarks', this.state.landmarks)
    if(this.state.landmarks.length){
      return (
        <View style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {this.state.landmarks.map(landmark => {
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
