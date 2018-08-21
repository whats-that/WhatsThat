import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Text } from 'react-native';

const Loader = props => {
  const { loading, ...attributes } = props;

  return (
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={{ fontFamily: 'AppleSDGothicNeo-SemiBold', fontSize: 17, marginTop: 10 }} >Image Processing</Text>
          <ActivityIndicator size="large" color="blue" animating={loading} />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 115,
    width: 200,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
