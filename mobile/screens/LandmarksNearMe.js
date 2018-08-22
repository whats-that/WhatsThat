import React from 'react';
import axios from 'axios';
import MapView from 'react-native-maps';
import { setSearchString } from '../reducers/searchString';
import { connect } from 'react-redux';

import { View, Text } from 'react-native'

class LandmarksNearMe extends React.Component {
    constructor() {
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

    landmarkWasPressed(event) {
        this.props.setSearchString(event.name);
        this.props.navigation.navigate('Web');
    }

    async componentWillReceiveProps(nextProps){
        const currentLandmark = nextProps.currentLandmark;

        if (!currentLandmark){
            return;
        }

            await this.setState({
                geocoderBody: {
                    latitude: currentLandmark.coordinates[0],
                    longitude: currentLandmark.coordinates[1],
                    distance: 1000,
                }
            })

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

        if (currentLandmark){
            this.setState({
                region:{
                    latitude: currentLandmark.coordinates[0],
                    longitude: currentLandmark.coordinates[1],
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                }
            })
        }
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition(async success => {
            let latitude, longitude;

            if (!this.props.currentLandmark) {
            latitude = success.coords.latitude;
            longitude = success.coords.longitude;
            } else {
                latitude = this.props.currentLandmark.coordinates[0];
                longitude = this.props.currentLandmark.coordinates[1];
            }

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

            let results = await axios.post('http://whatsthat-capstone.herokuapp.com/api/geocoder', this.state.geocoderBody);

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
        });
    }

    render() {
        return (
            <MapView style={{ height: '100%', width: '100%' }} initialRegion={this.state.region} region={this.state.region} zoomEnabled={true}>

                {this.state.landmarks.map((landmark) => (
                    <MapView.Marker
                        coordinate={{ latitude: landmark.latitude, longitude: landmark.longitude }}
                        title={landmark.name}
                        key={landmark.name}>
                        <MapView.Callout>
                            <View>
                                <Text>{landmark.name}</Text>
                                <Text onPress={() => this.landmarkWasPressed(landmark)} style={{ color: 'blue' }}>more...</Text>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
                ))}

                {this.props.currentLandmark ?
                <MapView.Marker
                    pinColor='#000000'
                    coordinate={{ latitude: this.props.currentLandmark.coordinates[0], longitude: this.props.currentLandmark.coordinates[1] }}>
                    <MapView.Callout>
                            <View>
                                <Text>{this.props.currentLandmark.name}</Text>
                                <Text onPress={() => this.landmarkWasPressed(this.props.currentLandmark)} style={{ color: 'blue' }}>more...</Text>
                            </View>
                        </MapView.Callout>
                        </MapView.Marker>
                    : null}
            </MapView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentLandmark: state.landmark[state.landmark.length - 1],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchString: (searchString) => dispatch(setSearchString(searchString)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandmarksNearMe);
