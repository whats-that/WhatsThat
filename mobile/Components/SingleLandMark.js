import React from 'react'
import { Text, View, Button } from 'react-native'
import axios from 'axios'

export default class SingleLandMarks extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  
  async componentDidMount() {
    const res = await axios.get(`/server/${this.props.id}`)
    this.setState(res.data)
  }

  render() {
    return ()
  }
}