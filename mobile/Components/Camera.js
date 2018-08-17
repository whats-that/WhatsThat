import React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	Button,
	CameraRoll,
	ScrollView,
	Image,
	ActivityIndicator
} from "react-native";
import { Camera, Permissions, FileSystem } from "expo";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default class CameraView extends React.Component {
	constructor() {
		super();
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			newPhotos: false,
			previewImage: false,
			previewSource: "",
			photoBlob: {},
			isShowingPicture: true,
			cameraPhotos: [],
			cameraPhotosAreLoading: false
		};
		this.takePicture = this.takePicture.bind(this);
		this.onPictureSaved = this.onPictureSaved.bind(this);
		this.usePicture = this.usePicture.bind(this);
		this.getPhotos = this.getPhotos.bind(this);
		this.selectedPictureURI = this.selectedPictureURI.bind(this);
		this.closeCameraRoll = this.closeCameraRoll.bind(this);
	}

	selectedPictureURI(pictureURI) {
		this.setState({
			previewSource: pictureURI,
			previewImage: true,
			isShowingPicture: false
		});
	}

	closeCameraRoll() {
		this.setState({
			isShowingPicture: false
		});
	}

	async getPhotos() {
		this.setState({
			cameraPhotosAreLoading: true
		});

		try {
			const photos = await CameraRoll.getPhotos({
				first: 100,
				assetType: "All"
			});

			await this.setState({
				cameraPhotos: photos.edges,
				previewImage: false,
				isShowingPicture: true,
				cameraPhotosAreLoading: false
			});
		} catch (err) {
			console.warn("error loading images", err);
			this.setState({
				cameraPhotosAreLoading: false
			});
		}
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === "granted" });
		FileSystem.makeDirectoryAsync(
			FileSystem.documentDirectory + "photos"
		).catch(e => {
			console.log(e, "Directory exists");
		});
	}

	async takePicture() {
		console.log("structural console.log; don't remove");
		if (this.camera) {
			this.camera.takePictureAsync({
				onPictureSaved: this.onPictureSaved,
				base64: true,
				quality: 0.1
			});
		}
	}

	onPictureSaved = async photo => {
		let destinationUri = `photos/${Date.now()}.jpg`;
		const destinationPath = `${FileSystem.documentDirectory}${destinationUri}`;
		destinationUri = "/" + destinationPath.substring(8);
		await FileSystem.moveAsync({
			from: photo.uri,
			to: destinationPath
		});
		await this.setState({
			previewImage: true,
			previewSource: destinationUri,
			newPhotos: true,
			photoBlob: photo
		});
	};
	async usePicture() {
<<<<<<< HEAD
<<<<<<< HEAD
		const result = await axios.post('http://whatsthat-capstone.herokuapp.com/api/server/getDataFromGoogleAPI', this.state.photoBlob)
		console.warn(result)
		return;
=======
		const result = await axios.post('http://172.16.23.112:8080/api/server/getDataFromGoogleAPI', this.state.photoBlob)
		console.log(result.data[0].webDetection.bestGuessLabels[0].label)

>>>>>>> b229a73fca886521b01133c02480f28810462f2d
=======
		// await axios.post('http://whatsthat-capstone.herokuapp.com/api/server', this.state.photoBlob)
		console.log(this.state.photoBlob);
		const result = await axios.post(
			"http://172.16.23.112:8080/api/server/getDataFromGoogleAPI",
			this.state.photoBlob
		);
		// console.log(result.data[0].webDetection.bestGuessLabels[0].label)
		// 	navigator.geolocation.getCurrentPosition(
		// 		(position) => {
		// 			 console.log(position)
		// 		},
		// 		(error) => alert(error.message),
		// 		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		//  )
		return;
>>>>>>> 0e4616fd0b7bc395e32e3d9988502c5e98c912af
	}
	render() {
		const { hasCameraPermission, isShowingPicture } = this.state;
		if (this.state.cameraPhotosAreLoading) {
			return <ActivityIndicator style={{ width: "100%", height: "100%" }} />;
		}

		if (this.state.cameraPhotos.length > 0 && isShowingPicture) {
			return (
				<View>
					<ScrollView>
						{this.state.cameraPhotos.map((photo, i) => {
							return (
								<TouchableOpacity
									onPress={() => this.selectedPictureURI(photo.node.image.uri)}
									key={i}
								>
									<Image
										source={{ uri: photo.node.image.uri }}
										key={i}
										style={{ width: "100%", height: 300 }}
										resizeMode="cover"
										key={i}
									/>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
					<TouchableOpacity
						onPress={this.closeCameraRoll}
						style={{ position: "absolute", paddingLeft: 10, bottom: 50 }}
					>
						<Ionicons name="md-close-circle" size={60} color="#cc0000" />
					</TouchableOpacity>
				</View>
			);
		}
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			if (this.state.previewImage) {
				return (
					<View style={{ flex: 1, bottom: 49 }}>
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
			} else {
				return (
					<View style={{ flex: 1, bottom: 49 }}>
						<Camera
							style={{ flex: 1 }}
							type={this.state.type}
							ref={ref => {
								this.camera = ref;
							}}
						>
							<View
								style={{
									flex: 1,
									backgroundColor: "transparent",
									flexDirection: "row"
								}}
							/>
							<View
								style={{
									flex: 1,
									backgroundColor: "transparent",
									flexDirection: "row",
									alignSelf: "center"
								}}
							>
								<TouchableOpacity
									onPress={this.takePicture}
									style={{ alignSelf: "flex-end" }}
								>
									<Ionicons
										name="ios-radio-button-on"
										size={70}
										color="white"
									/>
								</TouchableOpacity>
								</View>
									<TouchableOpacity
										onPress={this.getPhotos}
										style={{ position: "absolute", bottom: 15, right: 15 }}
									>
										<Ionicons name="ios-photos" size={30} color="white" />
									</TouchableOpacity>
						</Camera>
					</View>
				);
			}
		}
	}
}
