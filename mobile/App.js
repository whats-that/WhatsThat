import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import store from './store';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
// import { Notifications } from 'expo';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
