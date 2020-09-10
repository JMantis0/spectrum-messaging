[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)
[![Only 32 Kb](https://badge-size.herokuapp.com/Naereen/StrapDown.js/master/strapdown.min.js)](https://github.com/Naereen/StrapDown.js/blob/master/strapdown.min.js)

## Spectrum Messaging
 
A messaging app that communicates the emotion behind a text to the user.

# Motivation

As a person who stuggles to understand the emotional context of a text message, I would like an app which tells me directly what the tone of each message is.

# Installation
  `npm install`
  
  Then launch from `npm start`
  
# Usage
Once the app is launched in the browser, login or sign-up on the authorization page. Once you're in, feel free to type in the chat input and send and receive messages. Left click on the page and navigate to the inspect tab, where the tonality will be described in the console log. 


# Deployed Link
https://spectrum-messaging.herokuapp.com/

# Technologies Used
* Auth0
* Express
* MySQL 
* Sequelize
* Material UI
* React

# Credits 
[Jesse Mazur](https://github.com/JMantis0)

[Jeremiah Yates](https://github.com/jyates92)

[Caroline Lee](https://github.com/carooflee)

# Testing
We used Travis CI. To get started you'll need to do the following.
1. Go to Travis-ci.com and Sign up with GitHub.
1. Accept the Authorization of Travis CI. You’ll be redirected to GitHub.
1. Click on your profile picture in the top right of your Travis Dashboard, click Settings and then the green Activate button, and select the repositories you want to use with Travis CI.
1. Add a .travis.yml file to your repository to tell Travis CI what to do. The following example specifies a Ruby project that should be built with Ruby 2.2 and the latest versions of JRuby.
1. Add the .travis.yml file to git, commit and push to trigger a Travis CI build
1. Check the build status page to see if your build passes or fails according to the return status of the build command by visiting Travis CI and selecting your repository.

# License
This project is licensed under the MIT License.
