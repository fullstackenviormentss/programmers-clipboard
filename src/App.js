import React, { Component } from 'react';
import copy from 'copy-js/src/copy.js';
import './App.css';
import charsList from './charsList';

// React components
import Char from './Char';
import OutputChooser from './OutputChooser';
import Notification from './Notification';
import Footer from './Footer';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			choice: 'char',
			copied: '',
			notificationActive: false,
		};
		this.handleCopy = this.handleCopy.bind(this);
		this.handleChoiceChange = this.handleChoiceChange.bind(this);
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h1>Programmer's clipboard</h1>
				</div>
				<OutputChooser choice={this.state.choice} handleChoiceChange={this.handleChoiceChange} />
				<div className="Chars">
					{charsList.map(item => <Char data={item} choice={this.state.choice} key={item.hexadecimal} handleCopy={this.handleCopy}/> )}
				</div>
				<Notification text={this.state.copied} active={this.state.notificationActive}/>
				<Footer/>
			</div>
		);
	}

	handleCopy(char) {
		const prefixes = {
			css: '\\',
			javascript: '\\u',
			'hexadecimal-ncr': '&#x',
		}

		let charType;
		let pre = ''
		if (this.state.choice === 'char') {
			charType = 'char';
		} else {
			charType = 'hexadecimal';
			pre = prefixes[this.state.choice];
		}

		const copyText = '' + pre + char[charType];
		console.log('copied:', copyText);
		copy(copyText);
		this.setState({
			copied: copyText,
			notificationActive: true,
		})

		setTimeout(() => {
			this.setState({
				notificationActive: false,
			})
		}, 1000);
	}

	handleChoiceChange(choice) {
		console.log('choice:', choice);
		this.setState({
			choice: choice,
		})
	}
}

export default App;
