import React from "react";
import {  View, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Permissions } from "expo";
import { createLandmark } from "../reducers/landmark";
import { createThing } from "../reducers/thing";
import CameraComponent from "./components/CameraComponent";
import PreviewImage from "./components/PreviewImage";
import NoPermission from "./components/NoPermission";

class CameraScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			hasCameraPermission: null,
			newPhotos: false,
			previewImage: false,
			previewSource: "",
			photoBlob: {},
			userId: "",
			restaurantDetection: false,
			loading: false
		} 
		this.exitPicture = this.exitPicture.bind(this)
    this.updateState = this.updateState.bind(this)
    this.setToggle = this.setToggle.bind(this)
	}

	static navigationOptions = {
		header: null
	};

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === "granted" })
		const userId = await AsyncStorage.getItem("userId")
    this.setState({ userId })
    const { navigation } = this.props;
		navigation.setParams({ setToggle: this.setToggle })
  }
  

	setToggle(key) {
		if (key === "restaurant")
			this.setState({ restaurantDetection: true });
		else this.setState({ restaurantDetection: false });
	}


	async exitPicture() {
		await this.setState({
			previewImage: false
		})
	}

	async updateState(destinationUri, photo) {
		//setState that is passable to child camera component
		await this.setState({
			previewImage: true,
			previewSource: destinationUri,
			newPhotos: true,
			photoBlob: photo
		})
	}

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />
		} else if (hasCameraPermission === false) {
			return <NoPermission />
		} else {
			return this.state.previewImage ? (
				<PreviewImage
					state={this.state}
					exitPicture={this.exitPicture}
          navigation={this.props.navigation}
          setToggle={this.setToggle}
				/>
			) : (
				<CameraComponent state={this.state} updateState={this.updateState} />
			)
		}
	}
}

const mapDispatch = dispatch => ({
	createLandmark: landmark => dispatch(createLandmark(landmark)),
	createThing: thing => dispatch(createThing(thing)),
	setSearchString: searchString => dispatch(setSearchString(searchString))
})

export default connect(
	null,
	mapDispatch
)(CameraScreen)
