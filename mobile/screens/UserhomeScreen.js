import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';
import { List, ListItem } from 'react-native-elements';

const list = [
  {
    title: 'MyPlaces',
    icon: 'place',
  },
  {
    title: 'MyThings',
    icon: 'dns',
  },
  {
    title: 'NearMe',
    icon: 'map',
  },
];

class Userhome extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      userId: '',
      userEmail: '',
    };
  }
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    const userEmail = await AsyncStorage.getItem('email');
    this.setState({ userId, userEmail });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          resizeMode="cover"
          style={{
            height: 280,
            alignItems: 'center',
          }}
          source={{
            uri:
              'http://bellatorra.com/wp-content/uploads/2016/02/Silver-Blur-Background-Wallpaper.jpg',
          }}
        >
          <UserAvatar name="Ryan S" size={100} style={{ marginTop: 70 }} />
          <Text style={{ fontSize: 20, marginTop: 10 }}>
            {this.state.userEmail}
          </Text>
        </ImageBackground>
        <View style={{backgroundColor: 'rgb(233, 255, 252)', marginTop: 0, paddingTop: 0}} >
          <List>
            {list.map(item => (
              <TouchableOpacity
                key={item.title}
                onPress={() => this.props.navigation.navigate(item.title)}
              >
                <ListItem title={item.title} leftIcon={{ name: item.icon }} />
              </TouchableOpacity>
            ))}
          </List>
        </View>
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  createLandmark: landmark => dispatch(createLandmark(landmark)),
});

export default connect(
  null,
  mapDispatch
)(Userhome);
