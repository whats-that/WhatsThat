import React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	Button,
	CameraRoll,
	ScrollView,
	Image
} from "react-native";
import { Camera, Permissions, FileSystem } from "expo";
import { Ionicons } from "@expo/vector-icons";

export default class CameraView extends React.Component {
	constructor() {
		super();
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			newPhotos: false,
			previewImage: false,
			previewSource: "",
			isShowingPicture: true,
			cameraPhotos: [],
		};
		this.takePicture = this.takePicture.bind(this);
		this.onPictureSaved = this.onPictureSaved.bind(this);
		this.getPhotos = this.getPhotos.bind(this);
		this.selectedPictureURI = this.selectedPictureURI.bind(this)
	}

	selectedPictureURI(pictureURI){
		this.setState({
			previewSource: pictureURI,
			previewImage: true,
			isShowingPicture: false,
		})
	}

	async getPhotos(){
		  const photos = await CameraRoll.getPhotos({
			  first: 100,
			  assetType: 'All'
		  });

		  await this.setState({
			  cameraPhotos: photos.edges,
			  previewImage: false,
			  isShowingPicture: true
		  })
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
		console.log("inside takePicture");
		if (this.camera) {
			this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
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
			newPhotos: true
		});
	};
	async usePicture() {
		return;
	}
	render() {
		const { hasCameraPermission, isShowingPicture } = this.state;
		 if (this.state.cameraPhotos.length > 0 && isShowingPicture){
			return (
			<ScrollView>
			{
					this.state.cameraPhotos.map((photo, i) => {
						return (
							<TouchableOpacity onPress={() => this.selectedPictureURI(photo.node.image.uri)
							} key={i}>
							<Image
								source={{uri: photo.node.image.uri}}
								key={i}
								style={{width: '100%', height: 300}}
								resizeMode="cover" key={i}/>
							</TouchableOpacity>
						)
					})
				}
				</ScrollView>
			)
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
                  flex:  1,
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
									style={{ alignSelf: "flex-end", paddingRight: 10}}
								>
									<Ionicons name="ios-arrow-dropright-circle" size={60} color="#00ffcc" />
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
							>
							</View>
							<View
								style={{
									flex: 1,
									backgroundColor: "transparent",
									flexDirection: "row",
									alignSelf: "center",
								}}
							>
								<TouchableOpacity
									onPress={this.takePicture}
									style={{ alignSelf: "flex-end" }}
								>
								<TouchableOpacity onPress={this.getPhotos} style={{position: 'absolute', bottom: 10, left: 140}}>
							<Image source={require('../assets/landscapeIcon.png')} style={{width: 70, height: 70, tintColor: 'white'}}/>
							</TouchableOpacity>
									<Ionicons
										name="ios-radio-button-on"
										size={70}
										color="white"
									/>
								</TouchableOpacity>
							</View>
						</Camera>
					</View>
				);
			}
		}
	}
}
