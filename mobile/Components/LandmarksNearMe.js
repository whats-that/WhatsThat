import React from 'react';
import axios from 'axios'
// const {geocoderAppId, geocoderAppCode} = require('../secrets');

export default class LandmarksNearMe extends React.Component {
    constructor(){
        super();
    }

    async componentDidMount(){
        let latitude, longitude;

        navigator.geolocation.getCurrentPosition(async success => {
            latitude = success.coords.latitude;
            longitude = success.coords.longitude;
            const meters = 1000;
            try {
                let result = await axios.get( `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=${geocoderAppId}&app_code=${geocoderAppCode}&mode=retrieveLandmarks&prox=${latitude},${longitude},${meters}`);
                console.warn(result.data.Response.View);
            } catch (err){
                console.warn('error', err);
            }
        });
    }

    render(){
        return null;
    }
}
