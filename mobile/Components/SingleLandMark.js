import React from 'react'
import { Text, View, TextInput, Button, Picker, Image } from 'react-native'
import axios from 'axios'

export default class SingleLandMark extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      landmark: {name: 'test'},
      rating: 5,
      comment: 'This is a test comment'
    }
    this.update = this.update.bind(this)
  }
  
  async componentDidMount() {
    const res = await axios.get(`http://whatsthat-capstone.herokuapp.com/api/server/${this.props.id}`)
    this.setState({
      landmark: res.data,
      rating: res.data.rating,
      comment: res.data.comment
    })
  }

  update() {
    console.log(this.state)
  }

  render() {
    return (
      <View style={{
				flex: 1,
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center"
			}}>
        {/* <Image style={{
          width: 300,
          height: 300,
          resizeMode: Image.resizeMode.contain,
        }}
          source={{uri:`data:image/png;base64,${this.state.landmark.base64}`}}/> */}
        <Text>{this.state.landmark.name}</Text>
        <Text>Stars</Text>
        <TextInput 
          style={{ height: 40, width: 40, borderColor: 'black', borderWidth: 1, textAlign: "center" }} 
          onChangeText={rating => this.setState({rating})} 
          value={this.state.rating} 
          placeholder={""}/>
        {/* <Picker
          selectedValue={this.state.rating}
          style={{width: 40}}
          onValueChange={itemValue => this.setState({rating: itemValue})}
          mode='dropdown'>
          <Picker.Item label='1' value='1' />
          <Picker.Item label='2' value='2' />
          <Picker.Item label='3' value='3' />
          <Picker.Item label='4' value='4' />
          <Picker.Item label='5' value='5' />
        </Picker> */}
        <Text>Comment</Text>
        <TextInput 
          style={{ height: 40, width: 300, borderColor: 'black', borderWidth: 1, textAlign: "center" }} 
          onChangeText={comment => this.setState({comment})} 
          value={this.state.comment} 
          placeholder={this.state.comment}/>
        <Button onPress={this.update} title='Submit review'/>
      </View>
    )
  }
}
