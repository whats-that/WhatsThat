import React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	Button,
	TextInput
} from "react-native";

import { Camera, Permissions, FileSystem } from "expo";
import { Ionicons } from "@expo/vector-icons";

export default class LoginScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: ""
		};
	}

	handleInput() {
		return;
	}
	render() {
		return (
			<ImageBackground
				style={{ flex: 1 }}
				source={{
					uri:
						"https://cdn-images-1.medium.com/max/1920/1*AcYLHh0_ve4TNRi6HLFcPA.jpeg"
				}}
			>
				<View
					style={{
						backgroundColor: "transparent",
						flex: 1,
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<Text style={{ fontSize: 32, color: "white", textAlign: "center" }}>
						Welcome to What's That!
					</Text>
					<Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
						Please sign in to continue
					</Text>
					{/* <View
						style={{
							justifyContent: "center",
							marginTop: 50,
							padding: 20,
							backgroundColor: "#ffffff"
						}}
					> */}
						<TextInput
              style={{ height: 40, width: 300 }}
              placeholder="Username"
							onChangeText={text => this.setState({ username: text })}
							value={this.state.username}
						/>
					{/* </View> */}
				</View>
			</ImageBackground>
		);
	}
}
