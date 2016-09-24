import React from 'react';

class DisplayBoard extends React.Component {
	render() {
      return (<div className="displayBox"><h3>Result: {this.props.value}</h3></div>);
  }
}

export default DisplayBoard;