import React from 'react';
import { Icon } from 'expo';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello World</Text>
        <Icon.Ionicons
          name={this.props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={
            this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
          }
        />
      </View>
    );
  }
}
