import React from 'react';
import axios from 'axios';
import MapView from 'react-native-maps';
import {setSearchString} from '../reducers/searchString';
import {connect} from 'react-redux';

import {View, Text, TouchableOpacity} from 'react-native'

class LandmarksNearMe extends React.Component {
    constructor(){
        super();
        this.state = {
            landmarks: [],
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            geocoderBody: {},
        };
        this.landmarkWasPressed = this.landmarkWasPressed.bind(this);
    }

    landmarkWasPressed(event){
        // console.warn(event);
        this.props.setSearchString(event.name);
        // this.props.navigation.navigate('Wiki', { keyword: event.name });
        this.props.navigation.navigate('Wiki');
    }

    componentDidMount(){

        navigator.geolocation.getCurrentPosition(async success => {
            const latitude = success.coords.latitude;
            const longitude = success.coords.longitude;

            this.setState({
                geocoderBody: {
                    latitude: latitude,
                    longitude: longitude,
                    distance: 1000,
                },
                region: {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                }
            });

            let results = await axios.post('http://172.16.21.174:8080/api/geocoder', this.state.geocoderBody);

            let locationObjects = [];

            results.data.forEach(locationObject => {
                const locationToAdd = {
                    name: locationObject.Location.Name,
                    latitude: locationObject.Location.DisplayPosition.Latitude,
                    longitude: locationObject.Location.DisplayPosition.Longitude,
                };

                    locationObjects.push(locationToAdd);
            });

            this.setState({
                landmarks: locationObjects,
            });

            // console.warn(this.state.landmarks);
        });
    }

    render(){
        return (
        <MapView style={{height: '100%', width: '100%'}} initialRegion={this.state.region} region={this.state.region} zoomEnabled={true}>

        {this.state.landmarks.map((landmark) => (
           <MapView.Marker
            coordinate={{latitude: landmark.latitude, longitude: landmark.longitude}}
              title={landmark.name}
            key={landmark.name} description={'clickable text'}>
            <MapView.Callout>
        <View>
            <Text>{landmark.name}</Text>
            <Text onPress={() => this.landmarkWasPressed(landmark)} style={{color: 'blue'}}>more...</Text>
        </View>
    </MapView.Callout>
    </MapView.Marker>
          ))}
          </MapView>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchString: (searchString) => dispatch(setSearchString(searchString)),
    }
}

export default connect(null, mapDispatchToProps)(LandmarksNearMe);
