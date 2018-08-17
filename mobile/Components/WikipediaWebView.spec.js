import chai from 'chai'
const expect = chai.expect;

import enzyme, {shallow} from 'enzyme';
import React from 'react';
import WikiScreen from '../screen/WikipediaWebView';

import Adapter from 'enzyme-adapter-react-16';
const adapter = new Adapter();
enzyme.configure({adapter});


describe('WikiScreen', () => {

  let wikipediaWebView;

  beforeEach(() => {
    wikipediaWebView = shallow(<WikiScreen />);
  });

  it('should render', () => {
    expect(wikipediaWebView.exists()).to.equal(true);
  });

  it('search string property should be a string', () => {
    expect(wikipediaWebView.state().searchString).to.be.a('string');
  });

  it('should show an activity indicator upon loading', () => {
    expect(wikipediaWebView.state().acitivityIndicatorIsVisible).equal(true);
  });

  it('should have a webview', () => {
    expect(wikipediaWebView.find('WebView').length).to.equal(1);
  });
});
