import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

export default class CameraButton extends React.Component {
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.warn('camera was clicked');
    }

    render(){
        return (
        <TouchableOpacity onPress={this.handleClick}>
            <Image source={require('../assets/cameraButton.png')} />
        </TouchableOpacity>
        )
    }
}
