import React from 'react'
import WikiScreen from './WikiScreen'
import Restaurant from './Restaurant'

export default class WebScreen extends React.Component {
  static navigationOptions = {
    title: 'Web',
  }

  render() {
    if(this.props.restaurantDetection){
      return (
        <WikiScreen />
      )
    } else {
      return <Restaurant />
    }
  }
}