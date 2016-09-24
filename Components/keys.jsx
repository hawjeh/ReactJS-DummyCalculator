import React from 'react';

class Keys extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			buttons: ['C', 'sqrt', 'x2', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '±', 0, '.', '=']
		}
	}

	handleClick(val) {
		switch(val){
			case "=":
				this.props.onCalculate("=");
				break;
			case "sqrt":
				this.props.onCalculate("sqrt");
				break;
			case "x2":
				this.props.onCalculate("x2");
				break;
			default:
				this.props.onKey(val);
				break;
		}
	}

	render() {
		var self = this;
		var buttons = this.state.buttons.map(function(val){
			return <button className="keyBtn" onClick={() => self.handleClick(val)}>{val}</button>;
		});

		return (<div>{buttons}</div>);
	}
}

export default Keys;