import React from 'react';
import {
  StyleSheet,
  WebView,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';

export default class WikiScreen extends React.Component {
  static navigationOptions = {
    title: 'Wiki',
  };

  constructor() {
    super(...arguments);
    // this.props.navigation.getParams('keyword', 'NO-ID'),
    if (this.props.navigation.state.params === 'no data') {
      this.state = {
        searchString: this.props.navigation.state.params.keyword,
        acitivityIndicatorIsVisible: true,
      };
      Alert.alert('No data found!');
    } else if (this.props.navigation.state.params) {
      this.state = {
        searchString: this.props.navigation.state.params.keyword,
        acitivityIndicatorIsVisible: true,
      };
    } else {
      this.state = {
        searchString: 'computer vision',
        acitivityIndicatorIsVisible: true,
      };
    }

    this.capitalizeFirstLetterOfWord = this.capitalizeFirstLetterOfWord.bind(
      this
    );

    this.appropriateStringForWikipediaSearch = this.appropriateStringForWikipediaSearch.bind(
      this
    );

    this.hideActivityIndicator = this.hideActivityIndicator.bind(this);
  }

  hideActivityIndicator() {
    this.setState({
      acitivityIndicatorIsVisible: false,
    });
  }

  capitalizeFirstLetterOfWord(arrOfWords) {
    let capitalizedFirstLetterArray = [];

    arrOfWords.forEach(word => {
      const newWord =
        word.charAt(0).toUpperCase() + word.substring(1, word.length);

      capitalizedFirstLetterArray.push(newWord);
    });

    return capitalizedFirstLetterArray;
  }

  appropriateStringForWikipediaSearch() {
    const wordsWithoutSpacesArray = this.state.searchString.split(' ');

    const capitalizedFirstLetterForWordsArray = this.capitalizeFirstLetterOfWord(
      wordsWithoutSpacesArray
    );

    return capitalizedFirstLetterForWordsArray.join(' ');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={this.hideActivityIndicator}
          source={{
            uri:
              'https://www.wikipedia.org/wiki/' +
              this.appropriateStringForWikipediaSearch(),
          }}
        />
        {this.state.acitivityIndicatorIsVisible ? (
          <ActivityIndicator style={{ width: '100%', height: '100%' }} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
