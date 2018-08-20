import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  TextInput,
  AsyncStorage,
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      // password2: '',
    };
  }

  login = evt => {
<<<<<<< HEAD
    fetch('http://whatsthat-capstone.herokuapp.com/api/users/login', {
=======
    fetch('http://172.16.21.174:8080/api/users/login', {
>>>>>>> b76aba54ebccae0a1f003878b4ef1e066ffe072c
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.success === true) {
          const userId = resJson.userId;
          const email = resJson.email;
          AsyncStorage.setItem('userId', userId);
          AsyncStorage.setItem('email', email);
          this.props.navigation.navigate('Userhome');
        } else {
          alert(resJson.message);
        }
      })
      .done();
  };

  signup = evt => {
<<<<<<< HEAD
    fetch('http://whatsthat-capstone.herokuapp.com/api/users/signup', {
=======
    fetch('http://172.16.21.174:8080/api/users/signup', {
>>>>>>> b76aba54ebccae0a1f003878b4ef1e066ffe072c
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.success === true) {
          const userId = resJson.userId;
          const email = resJson.email;
          AsyncStorage.setItem('userId', userId);
          AsyncStorage.setItem('email', email);
          this.props.navigation.navigate('Userhome');
        } else {
          alert(resJson.message);
        }
      })
      .done();
  };

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri:
            'https://cdn-images-1.medium.com/max/1920/1*AcYLHh0_ve4TNRi6HLFcPA.jpeg',
        }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>
            Welcome to WhatsThat!
          </Text>

          {this.state.createAccount ? (
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              Please create an account to continue
            </Text>
          ) : (
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
              Please sign in to continue
            </Text>
          )}

          <View
            style={{
              justifyContent: 'center',
              marginTop: 30,
              backgroundColor: 'transparent',
            }}
          >
            <TextInput
              style={{ height: 40, width: 300, textAlign: 'center' }}
              placeholder="Email"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              style={{ height: 40, width: 300, textAlign: 'center' }}
              placeholder="Password"
              secureTextEntry={true}
              // returnKeyType="go"
              ref={input => {
                this.passwordInput = input;
              }}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            {!this.state.createAccount ? (
              <View>
                <Button
                  onPress={() => this.setState({ createAccount: true })}
                  style={{ fontSize: 15 }}
                  title="Create Account"
                />
                <Button onPress={this.login} title="Submit" />
              </View>
            ) : (
              <View />
            )}

            {this.state.createAccount ? (
              <View>
                <TextInput
                  style={{ height: 40, width: 300, textAlign: 'center' }}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  onChangeText={password2 => this.setState({ password2 })}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Button
                  onPress={() => this.setState({ createAccount: false })}
                  title="Sign In"
                />
                <Button
                  onPress={this.signup}
                  title="Submit"
                  disabled={!(this.state.password === this.state.password2)}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
