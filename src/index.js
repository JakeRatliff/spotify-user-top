import React from 'react';
import {render} from 'react-dom';
import queryString from 'query-string';
import style from './stylesheets/main.scss';

import Start from './components/Start.js';
import App from './components/App.js';

import spotifyClientId from './spotify-client-id.js';
const spotifyAuthUri = 'https://accounts.spotify.com/authorize/?'
  + 'client_id=' + spotifyClientId
  + '&redirect_uri=' + 'http://localhost:8080'
  + '&scope=user-top-read'
  + '&response_type=token';

const hashFragment = queryString.parse(window.location.hash);
const appElement = document.getElementById('app');

if (hashFragment.access_token) {
  render(<App accessToken={hashFragment.access_token}/>, appElement);
} else {
  render(<Start handleAuth={() => { window.location.href = spotifyAuthUri; }} />, appElement);
}
