import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import store from './store';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
