import React from "react";
import { StyleSheet, Text, View, TabBarIOS } from "react-native";
import CameraView from "./Components/Camera";
import LoginScreen from "./Components/LoginScreen";
import WikipediaWebView from "./Components/WikipediaWebView";

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedTab: "Home"
		};
	}

	render() {
		return (
      // <LoginScreen />
			<TabBarIOS selectedTab={this.state.selectedTab}>
				<TabBarIOS.Item
					selected={this.state.selectedTab === "Home"}
					onPress={() => {
						this.setState({
							selectedTab: "Home"
						});
					}}
					title="Home"
					icon={require("./assets/homeIcon.png")}
				>
					<CameraView />
				</TabBarIOS.Item>

				<TabBarIOS.Item
					selected={this.state.selectedTab === "Results"}
					onPress={() => {
						this.setState({
							selectedTab: "Results"
						});
					}}
					title="Results"
					icon={require("./assets/searchIcon.png")}
				>
					<WikipediaWebView />
				</TabBarIOS.Item>
			</TabBarIOS>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
