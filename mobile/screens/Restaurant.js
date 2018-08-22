import React from 'react'
import {
  WebView,
  ActivityIndicator,
  View,
} from 'react-native'
import {connect} from 'react-redux'

class Restaurant extends React.Component {
  static navigationOptions = {
    title: 'Yelp',
  }
  
  constructor() {
    super(...arguments);
    this.state = {
      acitivityIndicatorIsVisible: true,
    }
    this.hideActivityIndicator = this.hideActivityIndicator.bind(this)
  }
 
  componentWillReceiveProps(nextProps){
    if (nextProps.restaurantUrl !== this.props.restaurantUrl){
      this.setState({
        acitivityIndicatorIsVisible: true
      })
    }
  }

  hideActivityIndicator() {
    this.setState({
      acitivityIndicatorIsVisible: false,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={this.hideActivityIndicator}
          source={{
            uri: this.props.restaurantUrl
          }}
        />
        {this.state.acitivityIndicatorIsVisible ? (
          <ActivityIndicator style={{ width: '100%', height: '100%' }} />
        ) : null}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurantUrl: state.restaurantUrl,
  }
}

export default connect(mapStateToProps)(Restaurant);