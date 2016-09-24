import React from 'react';

class Header extends React.Component {
	render() {
      return (<h1>Dummy Calculator</h1>);
  }
}

class DisplayBoard extends React.Component {
	render() {
      return (<div className="displayBox"><h3>Result: {this.props.value}</h3></div>);
  }
}

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

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: "0",
			onCalculateAction: false
		}
	}

	onKey(val){
		
		// Clear
		if(val === "C"){
			this.setState({value: "0", onCalculateAction: false });
			return;
		}

		var temp = this.state.value;
		var lastString = temp.charAt(temp.length - 1);
		var finalVal;

		if(val === "±" && temp != "0"){
			if(temp.charAt(0) === "-"){
				finalVal = temp.slice(1, -1);
			}else{
				finalVal = "-" + temp;
			}
			this.setState({value: finalVal, onCalculateAction: false });
			return;
		}else if(val === "±"){
			return;
		}

		if(this.state.onCalculateAction){
			temp = "0";
		}

		if((lastString === "+" || lastString === "-" || lastString === "*" || lastString === "/") && 
			(val === "+" || val === "-" || val === "*" || val === "/")){
			temp = temp.slice(0, -1);
		}

		if(((temp.indexOf('.') != -1 && val == "."))){
			return;
		}
		if(temp != "0"){
			finalVal = temp + val.toString();
		}else{
			finalVal = val.toString();
		}
		this.setState({value: finalVal, onCalculateAction: false });
	}

	onCalculate(action) {
		var temp = this.state.value;
		var lastString = temp.charAt(temp.length - 1);
		var calculated = 0;
		var err = false;

		if(action === "="){
			if(lastString === "+" || lastString === "-" || lastString === "*" || lastString === "/"){
				temp = temp.slice(0, -1);
			}
			try{
				calculated = eval(temp);
			}catch(e){
				this.setState({value: "INVALID: " + temp, onCalculateAction: true});
				return;
			}
		}else if(action === "sqrt"){
			try{
				calculated = Math.sqrt(parseInt(temp));
				if(isNaN(calculated)){
					err = true;
				}
			}catch(e){
				err = true;
			}
		}else if(action === "x2"){
			try{
				calculated = Math.pow(parseInt(temp), 2);
				if(isNaN(calculated)){
					err = true;
				}
			}catch(e){
				err = true;
			}
		}

		if(err){
			this.setState({value: "INVALID: " + temp, onCalculateAction: true});
		}else{
			this.setState({value: calculated.toString(), onCalculateAction: true});
		}
	}

	render() {
		return (
			<div className="box">
				<Header />
				<Keys onKey={this.onKey.bind(this)} onCalculate={this.onCalculate.bind(this)} />
				<DisplayBoard value={this.state.value}/>
			</div>
		);
	}
}

export default App;