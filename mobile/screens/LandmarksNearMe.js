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
        if (this.props.searchString.length === 0){
            return;
        }

        const currentLandmark = nextProps.currentLandmark;
        // console.warn('currentLandmark', currentLandmark);

        if (!currentLandmark || nextProps.currentLandmark === this.props.currentLandmark){
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
        let namesSet = new Set()

        results.data.forEach(locationObject => {
            const locationToAdd = {
                name: locationObject.Location.Name,
                latitude: locationObject.Location.DisplayPosition.Latitude,
                longitude: locationObject.Location.DisplayPosition.Longitude,
            };

            if (!namesSet.has(locationToAdd.name)){
                namesSet.add(locationToAdd.name);
                locationObjects.push(locationToAdd);
            }
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

            latitude = success.coords.latitude;
                longitude = success.coords.longitude;

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
            let namesSet = new Set();

            results.data.forEach(locationObject => {
                const locationToAdd = {
                    name: locationObject.Location.Name,
                    latitude: locationObject.Location.DisplayPosition.Latitude,
                    longitude: locationObject.Location.DisplayPosition.Longitude,
                };
                if (!namesSet.has(locationToAdd.name)){
                    namesSet.add(locationToAdd.name);
                    locationObjects.push(locationToAdd);
                }

            });

            this.setState({
                landmarks: locationObjects,
            });
        });
    }

    render() {
        let currentLandmark;

        if (this.props.currentLandmark && this.props.searchString.length > 0){
            currentLandmark = {
                latitude: this.props.currentLandmark.coordinates[0],
                longitude: this.props.currentLandmark.coordinates[1],
                name: this.props.currentLandmark.name,
            }
        } else {
            currentLandmark = {
                latitude: this.state.geocoderBody.latitude,
                longitude: this.state.geocoderBody.longitude,
                name: 'YOU ARE HERE'
            }
        }

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

                {currentLandmark.latitude ?
                <MapView.Marker
                    pinColor={'#66CD00'}
                    coordinate={{ latitude: currentLandmark.latitude, longitude: currentLandmark.longitude }}>
                    <MapView.Callout>
                            <View>
                                <Text>{currentLandmark.name}</Text>
                                {currentLandmark.name !== 'YOU ARE HERE' ?
                                <Text onPress={() => this.landmarkWasPressed(currentLandmark)} style={{ color: 'blue' }}>more...</Text> : null}
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
        searchString: state.searchString,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchString: (searchString) => dispatch(setSearchString(searchString)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandmarksNearMe);
