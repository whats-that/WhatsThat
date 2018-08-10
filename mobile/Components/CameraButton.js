import React from 'react';
import axios from 'axios'
import {TouchableOpacity, Image} from 'react-native';

export default class CameraButton extends React.Component {
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(){
        console.warn('camera was clicked');
        const res = await axios.get('http://whatsthat-capstone.herokuapp.com/api/users', {})
        console.log(res.data)
    }

    render(){
        return (
        <TouchableOpacity onPress={this.handleClick}>
            <Image source={require('../assets/cameraButton.png')} />
        </TouchableOpacity>
        )
    }
}
