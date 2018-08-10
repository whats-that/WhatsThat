import React from "react";
import { Text, View, TouchableOpacity, Image, Button } from "react-native";
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
			previewSource: ""
		};
		this.takePicture = this.takePicture.bind(this);
		this.onPictureSaved = this.onPictureSaved.bind(this);
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
  async usePicture () {
    return
  }
	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			if (this.state.previewImage) {
				return (
					<View style={{ flex: 1, bottom: 49 }}>
						<Image
							source={{ uri: this.state.previewSource }}
							resizeMode="cover"
							style={{ flex: 1, width: undefined, height: undefined }}
						/>
						<Button
							title="back-btn"
							onPress={() => this.setState({ previewImage: false })}
							style={{ alignSelf: "flex-end" }}
						>
							Retake
						</Button>
						<Button
							title="submit-btn"
							onPress={this.usePicture}
							style={{ alignSelf: "flex-end" }}
						>
							Submit
						</Button>
					</View>
				);
			} else {
				return (
					<View style={{ flex: 1, bottom: 49}}>
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
								{/* <TouchableOpacity
									style={{
										flex: 0.1,
										alignSelf: "flex-end",
									}}
									onPress={() => {
										this.setState({
											type:
												this.state.type === Camera.Constants.Type.back
													? Camera.Constants.Type.front
													: Camera.Constants.Type.back
										});
									}}
								>
									<Text
										style={{ fontSize: 18, marginBottom: 10, color: "white" }}
									>
										{" "}
										Flip{" "}
									</Text>
								</TouchableOpacity> */}
							</View>
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
						</Camera>
					</View>
				);
			}
		}
	}
}
