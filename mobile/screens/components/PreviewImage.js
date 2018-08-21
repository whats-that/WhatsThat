import React, { Component } from 'react';
import {
	View,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import axios from 'axios';
import { createLandmark } from '../../reducers/landmark';
import { createThing } from '../../reducers/thing';
import Loader from '../Loader';
import { setSearchString } from '../../reducers/searchString'

class PreviewImage extends Component {
	constructor () {
		super();
		this.usePicture = this.usePicture.bind(this);
		this.goToWiki = this.goToWiki.bind(this);
		this.goToAnalysis = this.goToAnalysis.bind(this);
		this.goToTextAnalysis = this.goToTextAnalysis.bind(this);
		this.textDetection = this.textDetection.bind(this);
	}

	async UNSAFE_componentWillMount () {
		await this.setState({
			...this.props.state
		});
	}

	async textDetection () {
		console.log('use picture for text detection....');
		const result = await axios.post(
			'http://172.16.23.112:8080/api/server/textToVoice',
			this.state.photoBlob
		);
		var text = result.data;
		this.setState({ loading: false });
		this.goToTextAnalysis(text);
	}

	async landmarkDetection () {
		console.log('2use picture for landmark detection....');
		const result = await axios.post(
			'http://172.16.23.112:8080/api/server/getDataFromGoogleAPI',
			this.state.photoBlob
		);
		var apiData = result.data;
		// console.log(apiData)
		var landmarkObj = {
			name: apiData.name,
			image: apiData.image,
			coordinates: apiData.coordinates,
			accuracy: apiData.accuracy,
		};
		landmarkObj.userId = Number(this.state.userId);

		const label = apiData.label.description;
		const label_r = apiData.label.score;
		const keywords = apiData.webEntities.map(el => el.description);
		const keywords_r = apiData.webEntities.map(el => el.score);
		console.log(apiData);
		const images = apiData.webImages.map(el => el.url);

		var thingObj = {
			label,
			label_r,
			keywords,
			keywords_r,
			images,
		};
		thingObj.userId = Number(this.state.userId);
		this.setState({ loading: false });
		console.log("****RESULT DATA NAME********", result.data.name)
		if (result.data.name) {
			console.log('landmark exists');
			this.props.createLandmark(landmarkObj);
			this.props.createThing(thingObj);
			this.goToAnalysis(thingObj);
			this.goToWiki(result.data.name);
		} else {
			console.log('no landmark exists');
			this.props.createThing(thingObj);
			this.goToAnalysis(thingObj);
		}
	}
  async usePicture() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 5000);
    console.log(this.state.textDetection);
		if (!this.state.textDetection) await this.landmarkDetection();
		else await this.textDetection();
  }

	goToWiki = passingData => {
		console.log('hit gotoWiki....');
		this.props.setSearchString(passingData);
    this.props.navigation.navigate('Wiki', { keyword: passingData });
	};

	goToAnalysis = data => {
    console.log('go to analysis... ');
    this.props.navigation.navigate('Analysis', { data });
  };

  goToTextAnalysis = text => {
    console.log('go to text analysis... ');
    this.props.navigation.navigate('Analysis', { text });
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground
					source={{ uri: this.state.previewSource }}
					resizeMode="cover"
					style={{ flex: 1, width: undefined, height: undefined }}
				>
					<Loader loading={this.state.loading} />
					<View
						style={{
							position: "absolute",
							right: 0,
							bottom: 0,
							left: 0,
							backgroundColor: "transparent",
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<TouchableOpacity
							onPress={this.props.exitPicture}
							style={{ alignSelf: "flex-end", paddingLeft: 10 }}
						>
							<Ionicons name="md-close-circle" size={60} color="#cc0000" />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.usePicture}
							style={{ alignSelf: "flex-end", paddingRight: 10 }}
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

const mapState = state => ({

})

const mapDispatch = dispatch => ({
	createLandmark: landmark => dispatch(createLandmark(landmark)),
	createThing: thing => dispatch(createThing(thing)),
	setSearchString: searchString => dispatch(setSearchString(searchString))
});

export default connect(
  null,
  mapDispatch
)(PreviewImage);
