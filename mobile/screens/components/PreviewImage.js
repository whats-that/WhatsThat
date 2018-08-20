import React, { Component } from "react";
import {
	View,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import axios from 'axios';
import { createLandmark } from '../../reducers/landmark';


class PreviewImage extends Component {
	constructor () {
		super();
		this.usePicture = this.usePicture.bind(this);
	}

	async UNSAFE_componentWillMount () {
		await this.setState({
			...this.props.state
		});
		console.log(this.state)
	}

  async usePicture() {
    const result = await axios.post(
      'http://172.16.23.112:8080/api/server/getDataFromGoogleAPI',
      this.state.photoBlob
    );
    console.log('this props... ', this.props);
    var landmarkObj = result.data;
    landmarkObj.userId = console.log(
      landmarkObj.name,
      landmarkObj.coordinates,
      landmarkObj.userId
    );

    landmarkObj.userId = Number(this.state.userId);

    this.props.createLandmark(landmarkObj);
    this.goToWiki(result.data.name);
  }

	goToWiki = passingData => {
    console.log('hit gotoWiki....');
    this.props.navigation.navigate('Wiki', { keyword: passingData });
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground
					source={{ uri: this.state.previewSource }}
					resizeMode="cover"
					style={{ flex: 1, width: undefined, height: undefined }}
				>
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

const mapDispatch = dispatch => ({
  createLandmark: landmark => dispatch(createLandmark(landmark)),
});

export default connect(
  null,
  mapDispatch
)(PreviewImage);
