import React from 'react';
import axios from 'axios'

export default class LandmarksNearMe extends React.Component {
    constructor(){
        super();
    }

    async componentDidMount(){
        let reqbody = {
            latitude: 0,
            longitude: 0,
            distance: 0,
        };

        navigator.geolocation.getCurrentPosition(async success => {
            reqbody.latitude = success.coords.latitude;
            reqbody.longitude = success.coords.longitude;
            reqbody.distance = 1000;
            let results = await axios.post('http://172.16.21.174:8080/api/geocoder', reqbody);
            console.warn('result', results);
        });
    }

    render(){
        return null;
    }
}
