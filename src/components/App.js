import React from 'react';

const limit = 50;
const apiUri = 'https://api.spotify.com/v1';
const tracksUri = apiUri + '/me/top/tracks?limit=' + limit;
const artistsUri = apiUri + '/me/top/artists?limit=' + limit;

export default class App extends React.Component {
    static propTypes = {
      accessToken: React.PropTypes.string.isRequired
    };

    state = {
      tracks: [],
      artists: []
    };

    componentDidMount() {
      this.updateLists();
    }

    updateLists() {
      const headers = {
        'Authorization': 'Bearer ' + this.props.accessToken
      };

      fetch(tracksUri, {headers: headers}).then((r) => r.json())
        .then((data) => this.setState({tracks: data}))
        .catch(e => console.log(e));

      fetch(artistsUri, {headers: headers}).then((r) => r.json())
        .then((data) => this.setState({artists: data}))
        .catch(e => console.log(e));
    }

    render() {
      return (
        <div>
          <h2>Tracks:</h2>
          <pre>{JSON.stringify(this.state.tracks, null, 2)}</pre>
          <h2>Artists:</h2>
          <pre>{JSON.stringify(this.state.artists, null, 2)}</pre>
        </div>
      );
    }
}
