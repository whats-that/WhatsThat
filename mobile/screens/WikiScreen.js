import React from 'react';
import {
  StyleSheet,
  WebView,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';

import {connect} from 'react-redux';

class WikiScreen extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      // searchString: '',
      acitivityIndicatorIsVisible: true,
    };
    this.capitalizeFirstLetterOfWord = this.capitalizeFirstLetterOfWord.bind(
      this
    );
    this.appropriateStringForWikipediaSearch = this.appropriateStringForWikipediaSearch.bind(
      this
    );
    this.hideActivityIndicator = this.hideActivityIndicator.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.searchString !== this.props.searchString){
      this.setState({
        acitivityIndicatorIsVisible: true
      })
    }
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
    // const wordsWithoutSpacesArray = keyword.split(' ');
    const wordsWithoutSpacesArray = this.props.searchString.split(' ');

    const capitalizedFirstLetterForWordsArray = this.capitalizeFirstLetterOfWord(
      wordsWithoutSpacesArray
    );

    return capitalizedFirstLetterForWordsArray.join(' ');
  }

  render() {
    console.log("this dot props dot searchString", this.props.searchString)
    // var searchString = '';
    // if (this.props.navigation.state.params === 'no data') {
    //   searchString = 'no data';
    //   Alert.alert('No data found!');
    // } else if (this.props.navigation.state.params) {
    //   searchString = this.props.navigation.state.params.keyword;
    // } else {
    //   searchString = 'computer vision';
    // }
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

const mapStateToProps = (state) => {
  return {
    searchString: state.searchString,
  }
}

export default connect(mapStateToProps, null)(WikiScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
