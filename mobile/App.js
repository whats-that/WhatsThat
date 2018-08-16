import React from "react";
import { TabBarIOS } from "react-native";
import CameraView from "./Components/Camera";
import LoginScreen from "./Components/LoginScreen";
import WikipediaWebView from "./Components/WikipediaWebView";
import SingleLandMark from './Components/SingleLandMark'
import PastLandMarks from './Components/PastLandMarks'
import Restaurant from './Components/Restaurant'
import LandmarksNearMe from './Components/LandmarksNearMe'

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedTab: "Login"
		};
	}

	render() {
		return (
			<PastLandMarks />
			// <TabBarIOS selectedTab={this.state.selectedTab}>
			// <TabBarIOS.Item
			// 		selected={this.state.selectedTab === "Login"}
			// 		onPress={() => {
			// 			this.setState({
			// 				selectedTab: "Login"
			// 			});
			// 		}}
			// 		title="Login"
			// 		icon={require("./assets/homeIcon.png")}
			// 	>
			// 		<LoginScreen />
			// 	</TabBarIOS.Item>

			// 	<TabBarIOS.Item
			// 		selected={this.state.selectedTab === "Camera"}
			// 		onPress={() => {
			// 			this.setState({
			// 				selectedTab: "Camera"
			// 			});
			// 		}}
			// 		title="Camera"
			// 		icon={require("./assets/cameraIcon.png")}
			// 	>
			// 		<CameraView />
			// 	</TabBarIOS.Item>

			// 	<TabBarIOS.Item
			// 		selected={this.state.selectedTab === "Results"}
			// 		onPress={() => {
			// 			this.setState({
			// 				selectedTab: "Results"
			// 			});
			// 		}}
			// 		title="Results"
			// 		icon={require("./assets/searchIcon.png")}
			// 	>
			// 		<WikipediaWebView />
			// 	</TabBarIOS.Item>
			// 	<TabBarIOS.Item
			// 		selected={this.state.selectedTab === "Landmarks"}
			// 		onPress={() => {
			// 			this.setState({
			// 				selectedTab: "Landmarks"
			// 			});
			// 		}}
			// 		title="Landmarks">
			// 		 <LandmarksNearMe />
			// 	</TabBarIOS.Item>
			// </TabBarIOS>
		);
	}
}
