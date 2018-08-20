import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { TabBarIOS } from 'react-native';
import { WebBrowser, Audio } from 'expo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import { ProgressCircle, StackedBarChart } from 'react-native-svg-charts';
import { Icon, Badge } from 'react-native-elements';

class AnalysisScreen extends React.Component {
  static navigationOptions = {
    title: 'WhatsThat Analysis',
  };

  async makeVoice(soundObject) {
    // var soundObject = new Audio.Sound();
    console.log('make voice start ...');
    try {
      await soundObject.unloadAsync();
      await soundObject.loadAsync(require('./out.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (err) {
      console.log(err); // An error occurred!
    }
  }
  async stopVoice(soundObject) {
    try {
      await soundObject.stopAsync();
    } catch (err) {
      console.log(err); // An error occurred!
    }
  }

  async pauseVoice(soundObject) {
    try {
      await soundObject.pauseAsync();
    } catch (err) {
      console.log(err); // An error occurred!
    }
  }

  render() {
    // console.log(this.props.navigation.state.params);
    var soundObject = new Audio.Sound();
    const colors = [
      'rgb(72, 163, 224)',
      'rgb(252, 112, 107)',
      'rgb(198, 243, 129)',
      'rgb(245, 245, 90)',
      'rgb(252, 219, 74)',
      'rgb(82, 187, 190)',
    ];
    if (!this.props.navigation.state.params) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 25 + '%' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontFamily: 'AlNile-Bold',
                marginLeft: 20 + '%',
              }}
            >
              Waiting for Image...
            </Text>
          </View>
        </View>
      );
    } else {
      return this.props.navigation.state.params.text ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 + '%' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontFamily: 'AlNile-Bold',
                marginLeft: 20 + '%',
              }}
            >
              TEXT
            </Text>
            <TouchableOpacity
              onPress={() => this.makeVoice(soundObject)}
              style={{ marginLeft: 60 }}
            >
              <Ionicons
                name={'ios-headset'}
                size={30}
                style={{ color: 'rgb(54, 113, 223)' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.stopVoice(soundObject)}
              style={{ marginLeft: 20 }}
            >
              <Ionicons
                name={'ios-square'}
                size={20}
                style={{ color: 'rgb(54, 113, 223)', marginTop: 6 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.pauseVoice(soundObject)}
              style={{ marginLeft: 20 }}
            >
              <Ionicons
                name={'md-pause'}
                size={20}
                style={{ color: 'rgb(54, 113, 223)', marginTop: 6 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 6,
              alignItems: 'center',
              width: 84 + '%',
              alignSelf: 'center',
            }}
          >
            <ScrollView
              style={{
                borderRadius: 10,
                backgroundColor: 'rgb(210, 225, 255)',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Khmer Sangam MN',
                  padding: 20,
                }}
              >
                {this.props.navigation.state.params.text}
              </Text>
            </ScrollView>
          </View>
        </View>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: 'rgb(83, 83, 83)' }}>
          <View style={{ flex: 1, flexDirection: 'row', paddingTop: 1 + '%' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontFamily: 'AlNile-Bold',
                marginLeft: 20 + '%',
                marginTop: 33,
                marginBottom: 10,
                color: 'white',
              }}
            >
              Analysis Result
            </Text>
          </View>
          <View style={{ flex: 9 }}>
            <Text
              style={{
                fontSize: 23,
                fontFamily: 'AlNile-Bold',
                color: 'rgb(238, 84, 84)',
                marginLeft: 15 + '%',
                marginTop: 5,
                textDecorationLine: 'underline',
              }}
            >
              {this.props.thingData.label}
            </Text>
            <View style={{ flex: 3, flexDirection: 'row' }}>
              <Text
                style={{
                  marginLeft: 20 + '%',
                  marginTop: 5 + '%',
                  fontSize: 20,
                  fontFamily: 'Khmer Sangam MN',
                  color: 'white',
                }}
              >
                Accuracy
              </Text>
              <ProgressCircle
                style={{ height: 120, width: 120, marginLeft: 12 + '%' }}
                progress={this.props.thingData.label_r}
                progressColor="red"
              />
              <Text
                style={{ fontSize: 24, color: 'white', top: 40, left: -90 }}
              >
                {Number(this.props.thingData.label_r.toFixed(2))}%
              </Text>
            </View>
            <View style={{ flex: 10 }}>
              <Text
                style={{
                  fontSize: 23,
                  fontFamily: 'AlNile-Bold',
                  color: 'rgb(72, 113, 224)',
                  marginLeft: 15 + '%',
                }}
              >
                [Keywords]
              </Text>
              <View style={{ marginTop: 10 }}>
                {this.props.thingData.keywords.map((keyword, idx) => (
                  <View key={idx}>
                    {keyword !== '' && (
                      <View>
                        {' '}
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'white',
                            marginLeft: 13 + '%',
                            marginTop: 10,
                          }}
                        >
                          {keyword}
                        </Text>
                        <View
                          style={{
                            width: this.props.thingData.keywords_r[idx] * 130,
                            height: 25,
                            marginLeft: 13 + '%',
                            margin: 5,
                            backgroundColor:
                              colors[Math.floor(Math.random() * 6)],
                          }}
                        >
                          <Text
                            style={{
                              textAlign: 'center',
                              marginTop: 4,
                            }}
                          >
                            {this.props.thingData.keywords_r[idx].toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <View style={{ marginTop: 50 }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'AlNile-Bold',
                    color: 'rgb(255, 255, 158)',
                    marginLeft: 15 + '%',

                  }}
                >
                  [Similar Images]
                </Text>
              </View>
              <ScrollView
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginLeft: 11,
                  marginTop: 20,
                  width: 95 + '%',
                }}
                horizontal={true}
              >
                {this.props.thingData.images.map(image => (
                  <TouchableOpacity key={image} onPress={() => Linking.openURL(image)}>
                    <Image
                      style={{ flex: 3, width: 200, height: 200, margin: 3 }}
                      source={{
                        uri: image,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}
const mapState = (state, ownProps) => {
  if (ownProps.navigation.state.params) {
    return {
      thingData: ownProps.navigation.state.params.data,
    };
  } else {
    return {};
  }
};
const mapDispatch = dispatch => ({});
export default connect(
  mapState,
  mapDispatch
)(AnalysisScreen);
