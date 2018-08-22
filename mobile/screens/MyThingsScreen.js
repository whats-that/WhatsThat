import React from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { Tile } from 'react-native-elements';
import { fetchUserThing } from '../reducers/thing';

class MyThingsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Things',
  };
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    await this.props.fetchUserThing(Number(userId));
  }

  render() {
    const { myThings } = this.props;
    return (
      !myThings || (
        <ScrollView>
          <ImageBackground
            resizeMode="cover"
            style={{ alignItems: 'center', height: 100 }}
            source={{
              uri:
                'https://medialoot.com/preview/atmosphere-app-backgrounds/img/iphone-2.jpg',
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'AlNile-Bold',
                marginTop: 30,
                color: 'white',
              }}
            >
              History
            </Text>
          </ImageBackground>
          <View>
            {myThings.map(myThing => (
              <Tile
                key={myThing.id}
                imageSrc={{
                  uri: myThing.images[0],
                }}
                title={
                  myThing.label +
                  '  (' +
                  myThing.label_r.toFixed(2) * 100 +
                  '%)'
                }
                contentContainerStyle={{ height: 170 }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}
                  >
                    {myThing.keywords.map((keyword, idx) => (
                      <Text key={idx} style={{ fontSize: 15 }}>
                        {keyword}{' '}
                      </Text>
                    ))}
                  </View>
                </View>
              </Tile>
            ))}
          </View>
        </ScrollView>
      )
    );
  }
}

const mapState = state => ({
  myThings: state.thing,
});
const mapDispatch = dispatch => ({
  fetchUserThing: userId => dispatch(fetchUserThing(userId)),
});

export default connect(
  mapState,
  mapDispatch
)(MyThingsScreen);
