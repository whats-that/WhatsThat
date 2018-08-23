import React, { Component } from 'react'
import {
	View,
	ImageBackground,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import { connect } from 'react-redux'
import axios from 'axios'
import { createLandmark } from '../../reducers/landmark'
import { createThing } from '../../reducers/thing'
import Loader from '../Loader'
import { setSearchString } from '../../reducers/searchString'
import { setRestaurantUrl } from '../../reducers/restaurantUrl'

class PreviewImage extends Component {
	constructor() {
		super()
		this.usePicture = this.usePicture.bind(this)
		this.goToWiki = this.goToWiki.bind(this)
		this.goToAnalysis = this.goToAnalysis.bind(this)
		this.restaurantDetection = this.restaurantDetection.bind(this)
	}

	async UNSAFE_componentWillMount() {
		await this.setState({
			...this.props.state,
		});
		Alert.alert(
			'What are we looking at here?',
			'Choose an option',
			[
				{
					text: 'Landmark', onPress: () => {
						this.props.setToggle('landmark')
						this.setState({ restaurantDetection: false })
					}
				},
				{
					text: 'Restaurant', onPress: () => {
						this.props.setToggle('restaurant')
						this.setState({ restaurantDetection: true })
					}
				},
			],
			{ cancelable: false }
		)
	}

	async restaurantDetection() {
		console.log('hello')
		const result = await axios.post(
			'http://whatsthat-capstone.herokuapp.com/api/server/text',
			this.state.photoBlob
		);
		var text = result.data
		if(text === 'Bad image'){
			Alert.alert(
				`Please take a better image`,
				[{ text: 'Try Again' }],
				{ cancelable: false })
		} else {
			console.log('text', text)
			this.setState({ loading: false })
			let latitude
			let longitude
			navigator.geolocation.getCurrentPosition(position => {
				latitude = position.coords.latitude
				longitude = position.coords.longitude
				console.log("from navigator lat: ", position.coords.latitude, "lon: ", position.coords.longitude)
			})
	
			Alert.alert(
				`Is this ${text}?`,
				'Choose!',
				[
					{
						text: 'Yes', onPress: async () => {
							const res = await axios.post('http://whatsthat-capstone.herokuapp.com/api/yelp', { text, latitude, longitude })
							this.goToRestaurant(res.data)
						}
					},
					{ text: 'Try Again' }
				],
				{ cancelable: false })
		}
	}

	async landmarkDetection() {
		const result = await axios.post(
			'http://whatsthat-capstone.herokuapp.com/api/server/getDataFromGoogleAPI',
			this.state.photoBlob
		);
		var apiData = result.data
		var landmarkObj = {
			name: apiData.name,
			image: apiData.image,
			coordinates: apiData.coordinates,
			accuracy: apiData.accuracy,
		};
		landmarkObj.userId = Number(this.state.userId)

		const label = apiData.label.description;
		const label_r = apiData.label.score;
		const keywords = apiData.webEntities.map(el => el.description)
		const keywords_r = apiData.webEntities.map(el => el.score)
		const images = apiData.webImages.map(el => el.url)

		var thingObj = {
			label,
			label_r,
			keywords,
			keywords_r,
			images,
		}
		thingObj.userId = Number(this.state.userId)
		this.setState({ loading: false })
		if (result.data.name) {
			this.props.createLandmark(landmarkObj)
			this.props.createThing(thingObj)
			this.goToAnalysis(thingObj)
			this.goToWiki(result.data.name)
		} else {
			this.setState({
				loading: false
			})

			Alert.alert('Oops!', 'Could not confidently recognize the image. Please take another photo and try again or see our closest results!', [{ text: 'Try Again' }, {
				text: 'Go To Analysis', onPress: () => {
					this.props.createThing(thingObj);
					this.goToAnalysis(thingObj);
				}
			}])
		}
	}
	async usePicture() {

		this.setState({ loading: true });
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, 5000);
		if (this.state.restaurantDetection) await this.restaurantDetection()
		else await this.landmarkDetection();
	}

	goToWiki = passingData => {
		this.props.setSearchString(passingData);
		this.props.setRestaurantUrl('');
		this.props.navigation.navigate('Web');
	}

	goToRestaurant = passingData => {
		this.props.setRestaurantUrl(passingData);
		this.props.setSearchString('');
		this.props.navigation.navigate('Yelp', { keyword: passingData });
	}

	goToAnalysis = data => {
		this.props.navigation.navigate('Analysis', { data });
	}

	goToTextAnalysis = text => {
		this.props.navigation.navigate('Analysis', { text });
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground
					source={{ uri: this.state.previewSource }}
					resizeMode="cover"
					style={{ flex: 1, width: undefined, height: undefined }}
				>
					{this.state.loading ? <Loader /> : null}
					<View
						style={{
							position: 'absolute',
							right: 0,
							bottom: 0,
							left: 0,
							backgroundColor: 'transparent',
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<TouchableOpacity
							onPress={this.props.exitPicture}
							style={{ alignSelf: 'flex-end', paddingLeft: 10 }}
						>
							<Ionicons name="md-close-circle" size={60} color="#cc0000" />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.usePicture}
							style={{ alignSelf: 'flex-end', paddingRight: 10 }}
						>
							<Ionicons
								name="ios-arrow-dropright-circle"
								size={60}
								color="#00ffcc"
							/>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const mapDispatch = dispatch => ({
	createLandmark: landmark => dispatch(createLandmark(landmark)),
	createThing: thing => dispatch(createThing(thing)),
	setSearchString: searchString => dispatch(setSearchString(searchString)),
	setRestaurantUrl: url => dispatch(setRestaurantUrl(url))
})

export default connect(
	null,
	mapDispatch
)(PreviewImage)
