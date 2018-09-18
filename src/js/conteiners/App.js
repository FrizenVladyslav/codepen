import React, { Component, Fragment } from 'react';
import '../../styles/App.css';
import { Header, Input, Button } from 'semantic-ui-react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

import socket from '../socket';

class App extends Component {
	constructor(props){
		super(props);
		this.state = ({
			value: '',
			connected: false,
			room: '---',
		});

		this.handleChange = this.handleChange.bind(this);
		this.connectedRoom = this.connectedRoom.bind(this);
	}

	handleChange(value){
		socket.emit('CHANGE_CLIENT', {
			room: this.state.room,
			code: value,
		}); //Отправляем текс серву
		this.setState({value}); //Сохрн его у себя
	}

	componentDidMount(){ //как только компонент отрендериться
		socket.on('CHANGE_SERVER', value => {
			this.setState({value});
		})
	}

	connectedRoom(){
		socket.emit('JOIN_ROOM', this.state.room),
		this.setState({connected: true});
	}

	render() {
		return (
			<Fragment>
				<div className='header'>
					<Header size='huge'>Chat's on room - {this.state.room}</Header>
					<Input onChange = {e => this.setState({room: e.target.value})} />
					<Button
						disabled = {this.state.connected}
						onClick = {this.connectedRoom}
						className = 'connected'
					>
						Connect
					</Button>
				</div>
				<div className="editor">
				<AceEditor
					mode="java"
					theme="github"
					name="UNIQUE_ID_OF_DIV"
					showGutter={true}
					fontSize = {18}
					value = {this.state.value}
					onChange = {this.handleChange}
					editorProps={{$blockScrollingya: true}}
				/>
				</div>
			</Fragment>
			
		);
	}
}

export default App;
