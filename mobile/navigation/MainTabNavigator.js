import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

// import HomeScreen from '../screens/HomeScreen';
import TabBarIcon from '../components/TabBarIcon';
import WikiScreen from '../screens/WikiScreen';
import AnalysisScreen from '../screens/AnalysisScreen'
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CameraScreen from '../screens/CameraScreen'
import UserhomeScreen from '../screens/UserhomeScreen'
import MyPlacesScreen from '../screens/MyPlacesScreen';
import MyThingsScreen from '../screens/MyThingsScreen';
import MyPeopleScreen from '../screens/MyPeopleScreen';

const HomeStack = createStackNavigator({
  Home: CameraScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-camera'}
    />
  ),
};

const MapStack = createStackNavigator({
  Settings: MapScreen,
});
MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-map'}
    />
  ),
};

const WikiStack = createStackNavigator({
  Wiki: WikiScreen,
});
WikiStack.navigationOptions = {
  tabBarLabel: 'Wiki',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-keypad'}
    />
  ),
};

const AnalysisStack = createStackNavigator({
  Analysis: AnalysisScreen,
});
AnalysisStack.navigationOptions = {
  tabBarLabel: 'Analysis',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-analytics'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Userhome: UserhomeScreen,
  MyPlaces: MyPlacesScreen,
  MyThings: MyThingsScreen,
  MyPeople: MyPeopleScreen,
});
ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack, // default view
  MapStack,
  WikiStack,
  AnalysisStack,
  ProfileStack
});





// name={'md-information-circle'}
