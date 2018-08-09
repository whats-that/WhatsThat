import React from 'react';
import {WebView} from 'react-native';

export default class WikipediaWebView extends React.Component {
    constructor(){
        super();

        this.suffix = 'rocky statue';

        this.replaceSpacesWithUnderScores = this.replaceSpacesWithUnderScores.bind(this);
    }

    replaceSpacesWithUnderScores(){
        const newString = this.suffix.split(' ').join('_');
        return newString;
    }

    render(){

        return (
            <WebView
            source={{uri: 'https://www.wikipedia.org/wiki/' + this.replaceSpacesWithUnderScores()}} />
        );
    }
}
