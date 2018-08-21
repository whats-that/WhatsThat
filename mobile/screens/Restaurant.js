import React from 'react'
import {
  StyleSheet,
  WebView,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native'
import {connect} from 'react-redux'

class Restaurant extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     rating: props.rating,
  //     price: props.price,
  //     image: props.image,
  //     name: props.name
  //   }
  // }
  constructor() {
    super(...arguments);
    this.state = {
      // searchString: '',
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
      // <View style={{
      //   flex: 1,
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center"
      // }}>
      //   <Image
      //     style={{width: 250, height: 250}}
      //     source={{uri: this.state.image}}
      //   />
      //   <Text>{this.state.name}</Text>
      //   <Text>{this.state.rating} Stars</Text>
      //   <Text>Price: {this.state.price}</Text>
      // </View>
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

export default connect(mapStateToProps, null)(Restaurant);