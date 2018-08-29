# What's That

What's that is a native mobile app built using React Native and Expo that uses image processing technology to identify landmarks and points of interest. Using Google's Cloud Vision API, we are able to determine the features of an image with a great deal of accuracy. To use, open the app and take a picture of a landmark or the name of a restaurant. After choosing the appropriate mode, you will be redirected to the appropriate source information: a Wikpedia entry for landmarks, or a Yelp entry for restaurants. 

<p float="left">
  <img src="https://i.imgur.com/ph2WvjQ.jpg" width="250" />
  <img src="https://i.imgur.com/O09fiQQ.jpg" width="250" /> 
  <img src="https://i.imgur.com/6eWjJoN.jpg" width="250" />
</p>


If the image the user submits can't be identified, the user has the option of trying again with a new image, or viewing an analysis page which shows Google's best guess as to the contents of the image.

<img src="https://i.imgur.com/SbaThw1.jpg" width="300" />

Users also have the ability to view their location on a map, along with other nearby landmarks. Tapping "more" on a map entry brings up the Wikipedia entry for that landmark.

<img src="https://i.imgur.com/kgRAKoF.jpg" width="250" />

Although you're not required to create an account, doing so allows you to rate and comment on landmarks, and to view the images you previously took (along with ratings and comments). We are currently building out a social functionality, which will allow you to view what other users had to say about landmarks around town. 

<img src="https://i.imgur.com/ByhObyk.jpg" width="250" />

## Setup
Download and install the Expo Desktop Client or Command Line Tools, as well as the Expo mobile app. Select the "mobile" directory as the directory to load within Expo. Using the mobile app, connect to the Expo desktop client; the app should be running properly at this point. The backend server is hosted on Heroku, and requires no setup. 