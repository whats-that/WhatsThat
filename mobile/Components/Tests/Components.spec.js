import Camera from '../Camera';
import LoginScreen from '../LoginScreen';
// import PastLandMarks from '../PastLandMarks';
// import SingleLandMark from '../SingleLandMark';
import WikipediaWebView from '../WikipediaWebView';

import React from 'react';
import renderer from 'react-test-renderer';


test('Camera renders correctly', () => {
  const tree = renderer.create(<Camera />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Login Screen renders correctly', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test('Past Landmarks view renders correctly', () => {
//   const tree = renderer.create(<PastLandMarks />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('Single Landmark view renders correctly', () => {
//   const tree = renderer.create(<SingleLandMark />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test('Wikipedia view renders correctly', () => {
  const tree = renderer.create(<WikipediaWebView />).toJSON();
  expect(tree).toMatchSnapshot();
});