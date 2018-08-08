import React from 'react';
import {Image, TouchableOpacity } from 'react-native';

export default class CameraButton extends React.Component {
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        console.warn('button getting hit')
    }
  render() {
    return (
    <TouchableOpacity onPress={this.handleClick}>
    <Image source={require('../assets/images/cameraButton.png')} />
    </TouchableOpacity>
    );
  }
}
