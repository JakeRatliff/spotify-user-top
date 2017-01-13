import React from 'react';

export default class Start extends React.Component {
  static propTypes = {
    handleAuth: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="start">
        <h1 className="title">User Stats for Spotify</h1>
        <button onClick={this.props.handleAuth}>Let's go!</button>
        <p>Created by Viktor Gustavsson &lt;villor94@gmail.com&gt;</p>
      </div>
    );
  }
}
