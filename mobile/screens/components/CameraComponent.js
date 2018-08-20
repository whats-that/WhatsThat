import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera, FileSystem } from 'expo';


export default class CameraComponent extends Component {
	constructor() {
		super();
		this.state = {
			type: Camera.Constants.Type.back,
		};
		this.takePicture = this.takePicture.bind(this);
		this.onPictureSaved = this.onPictureSaved.bind(this);
	}
	async UNSAFE_componentWillMount() {
		await this.setState({...this.props.state});
	}
  async takePicture() {
    if (this.camera) {
      const blob = await this.camera.takePictureAsync({
        onPictureSaved: this.onPictureSaved,
        base64: true,
        quality: 0.1,
			});
    }
	}
	onPictureSaved = async photo => {
    let destinationUri = `photos/${Date.now()}.jpg`;
    const destinationPath = `${FileSystem.documentDirectory}${destinationUri}`;
    destinationUri = '/' + destinationPath.substring(8);
    await FileSystem.moveAsync({
      from: photo.uri,
      to: destinationPath,
    });
		await this.props.updateState(destinationUri, photo);
  };

	render() {
		return (
			<View style={{ flex: 1 }}>
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
							<Ionicons name="ios-radio-button-on" size={70} color="white" />
						</TouchableOpacity>
					</View>
				</Camera>
			</View>
		);
	}
}
