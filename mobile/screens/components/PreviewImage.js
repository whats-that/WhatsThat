import React, { Component } from "react";
import {
	View,
	ImageBackground,
	TouchableOpacity,
	Ionicons
} from 'react-native';
import axios from 'axios';

export default class PreviewImage extends Component {

  async usePicture() {
    const result = await axios.post(
      'http://172.16.23.255:8080/api/server/getDataFromGoogleAPI',
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

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground
					source={{ uri: this.props.image }}
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
							// opacity: 0.3,
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<TouchableOpacity
							onPress={() => this.setState({ previewImage: false })}
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
