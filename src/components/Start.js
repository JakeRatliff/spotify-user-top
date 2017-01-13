import React from 'react';

export default class Start extends React.Component {
  static propTypes = {
    handleAuth: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <button onClick={this.props.handleAuth}>Authorize</button>
      </div>
    );
  }
}
