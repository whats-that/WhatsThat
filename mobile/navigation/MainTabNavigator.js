import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../Components/TabBarIcon'
import AnalysisScreen from '../screens/AnalysisScreen'
import MapScreen from '../screens/MapScreen'
import ProfileScreen from '../screens/ProfileScreen'
import CameraScreen from '../screens/CameraScreen'
import UserhomeScreen from '../screens/UserhomeScreen'
import MyPlacesScreen from '../screens/MyPlacesScreen'
import MyThingsScreen from '../screens/MyThingsScreen'
import MyPeopleScreen from '../screens/MyPeopleScreen'
import SingleLandMark from '../screens/SingleLandMark'
import LandmarksNearMe from '../screens/LandmarksNearMe'
import WebScreen from '../screens/WebScreen'

const HomeStack = createStackNavigator({
  Home: CameraScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-camera'} />
  ),
}

const MapStack = createStackNavigator({
  Settings: MapScreen,
})

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-map'} />,
}

const WebStack = createStackNavigator({
  Web: WebScreen,
})

WebStack.navigationOptions = {
  tabBarLabel: 'Web',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-keypad'} />
  ),
}

const AnalysisStack = createStackNavigator({
  Analysis: AnalysisScreen,
})

AnalysisStack.navigationOptions = {
  tabBarLabel: 'Analysis',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-analytics'} />
  ),
}

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Userhome: UserhomeScreen,
  MyPlaces: MyPlacesScreen,
  MyThings: MyThingsScreen,
  MyPeople: MyPeopleScreen,
  MyLandmark: SingleLandMark,
  NearMe: LandmarksNearMe,
  Restaurant: Restaurant
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-person'} />
  ),
}

export default createBottomTabNavigator({
  HomeStack, // default view
  MapStack,
  WebStack,
  AnalysisStack,
  ProfileStack,
})
