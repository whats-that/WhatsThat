import React from 'react';
import {WebView} from 'react-native';

export default class WikipediaWebView extends React.Component {
    constructor(){
        super();

        this.suffix = 'flat iron building';

        this.capitalizeFirstLetterOfWord = this.capitalizeFirstLetterOfWord.bind(this);

        this.appropriateStringForWikipediaSearch = this.appropriateStringForWikipediaSearch.bind(this);
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
        const wordsWithoutSpacesArray = this.suffix.split(' ');

        const capitalizedFirstLetterForWordsArray = this.capitalizeFirstLetterOfWord(wordsWithoutSpacesArray);

        return capitalizedFirstLetterForWordsArray.join(' ');
    }

    render(){

        return (
            <WebView
            source={{uri: 'https://www.wikipedia.org/wiki/' + this.appropriateStringForWikipediaSearch()}} />
        );
    }
}
