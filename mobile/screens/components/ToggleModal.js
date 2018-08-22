import React from "react";
import { View, ImageBackground, TouchableOpacity, Alert } from "react-native";

const ToggleModal = (props) => {
  return (
    Alert.alert(
      'What are we looking at here?',
      [
        {text: 'Landmark', onPress: () => console.log('Landmark pressed')},
        {text: 'Restaurant', onPress: () => console.log('Restaurant Pressed')},
      ],
      { cancelable: false }
    )
  )
}