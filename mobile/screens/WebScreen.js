import React from 'react'
import WikiScreen from './WikiScreen'
import Restaurant from './Restaurant'
import { connect } from 'react-redux';

class WebScreen extends React.Component {
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

const mapStateToProps = state => {
  return {
    restaurantDetection: state.restaurantDetection
  }
}

export default connect(mapStateToProps)(WebScreen)