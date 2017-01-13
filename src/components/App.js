import React from 'react';
import queryString from 'query-string';

const limit = 50;
const apiUri = 'https://api.spotify.com/v1';
const tracksUri = apiUri + '/me/top/tracks';
const artistsUri = apiUri + '/me/top/artists';
const timeRanges = [
  'short_term',
  'medium_term',
  'long_term'
];

const Track = (props) => (
  <li className="track">
    <img src={props.album.images[props.album.images.length - 1].url} alt={props.name} />
    <div className="list-number">{props.number}</div>
    <div className="list-names">
      <div title={props.name}>{props.name}</div>
      <div title={props.artists[0].name}>{props.artists[0].name}</div>
    </div>
  </li>
);

const Artist = (props) => (
    <li className="artist">
      { props.images.length ? (
        <img src={props.images[props.images.length - 1].url} alt={props.name} />
      ) : (
        <img src="" />
      )}
      <div className="list-number">{props.number}</div>
      <div className="list-names" title={props.name}>{props.name}</div>
    </li>
);

const List = (props) => (
  <div className="list-container">
    <h2>{props.title}</h2>
    <ol>
      {props.dataArray.map((el, i) => <props.type number={i + 1} key={i + 1} {...el} />)}
    </ol>
  </div>
);

const Selector = (props) => (
  <select value={props.value} onChange={props.handleChange}>
    {props.values.map(val => <option value={val} key={val}>{val}</option>)}
  </select>
);

export default class App extends React.Component {
    static propTypes = {
      accessToken: React.PropTypes.string.isRequired
    };

    state = {
      tracks: [],
      artists: [],
      timeRange: timeRanges[0]
    };

    componentDidMount() {
      this.updateLists();
    }

    updateLists() {
      const headers = {
        'Authorization': 'Bearer ' + this.props.accessToken
      };
      const query = '?' + queryString.stringify({
        limit: limit,
        time_range: this.state.timeRange
      });

      fetch(tracksUri + query, {headers: headers}).then((r) => r.json())
        .then((data) => this.setState({tracks: data.items}))
        .catch(e => console.log(e));

      fetch(artistsUri + query, {headers: headers}).then((r) => r.json())
        .then((data) => this.setState({artists: data.items}))
        .catch(e => console.log(e));
    }

    handleSelectorChange = (event) => {
      this.setState({timeRange: event.target.value}, this.updateLists);
    };

    render() {
      return (
        <div>
          <h1 className="title">User Stats for Spotify</h1>
          <div>
            <Selector values={timeRanges} value={this.state.timeRange} handleChange={this.handleSelectorChange} />
          </div>
          <List title="Top Tracks" type={Track} dataArray={this.state.tracks} />
          <List title="Top Artists" type={Artist} dataArray={this.state.artists} />
        </div>
      );
    }
}
