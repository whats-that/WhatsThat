import React from 'react';
import {WebView, ActivityIndicator, View, Text} from 'react-native';

export default class WikipediaWebView extends React.Component {
    constructor(){
        super();

        this.state = {
            searchString: 'empire state building',
            acitivityIndicatorIsVisible: true,
        };

        this.capitalizeFirstLetterOfWord = this.capitalizeFirstLetterOfWord.bind(this);

        this.appropriateStringForWikipediaSearch = this.appropriateStringForWikipediaSearch.bind(this);

        this.hideActivityIndicator = this.hideActivityIndicator.bind(this);
    }

    hideActivityIndicator(){
        this.setState({
            acitivityIndicatorIsVisible: false,
        });
    }

    capitalizeFirstLetterOfWord(arrOfWords){

        let capitalizedFirstLetterArray = [];

        arrOfWords.forEach(word => {
            const newWord = word.charAt(0).toUpperCase() + word.substring(1, word.length);

            capitalizedFirstLetterArray.push(newWord);
        });

        return capitalizedFirstLetterArray;
    }

    appropriateStringForWikipediaSearch(){
        const wordsWithoutSpacesArray = this.state.searchString.split(' ');

        const capitalizedFirstLetterForWordsArray = this.capitalizeFirstLetterOfWord(wordsWithoutSpacesArray);

        return capitalizedFirstLetterForWordsArray.join(' ');
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <WebView
                    onLoad={this.hideActivityIndicator}
                    source={{ uri: 'https://www.wikipedia.org/wiki/' + this.appropriateStringForWikipediaSearch() }} />
            {this.state.acitivityIndicatorIsVisible ?

            <ActivityIndicator style={{width: '100%', height: '100%'}}/> : null}
            </View>

        );
    }
}
