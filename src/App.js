import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player'

const getVideoId = require('get-video-id');
const Axios = require('axios');
const convert = require('xml-js');

function toSeconds(str){
	let parts = (str).split(':');
	let seconds = (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]); 
	return Number((seconds).toFixed(0))
}


class App extends Component {
	state = {
		videoId: null,
		objectText: null,
		videoLink: null,
		content: {},
		playing: false
	}

	componentDidMount(){

	}

	onSelectClick = () => {
		const videoId = this.state.videoId
		const videoLink = this.state.videoLink
		//console.log('videoId',videoId)

		Axios.post(`${process.env.REACT_APP_HOST_PORT}/api/get-subtitles`, {
			videoId,
			videoLink
		},
		{
			headers: {
          "Content-Type": "application/json"
      },
      params: {}
		})
		.then((res) => {
			if (res && res.data){
				//console.log(res)
				const context = convert.xml2js(res['data'], {})
				
				const arr = context.elements[0].elements[1].elements[0].elements

				let objVolume = {}
				arr.forEach((el) => {
					const secondsB = toSeconds(el.attributes.begin)
					const secondsE = toSeconds(el.attributes.end)

					if (!objVolume[secondsB]) {
						objVolume[secondsB] = {}
					}
					objVolume[secondsB].end = secondsE
					objVolume[secondsB].text = el.elements[0].text
				})

				console.log(JSON.stringify(objVolume, null, 2))


				this.setState({
					content: objVolume,
					playing: true
				})
			} else {
				console.log('error response');
			}
		})
		.catch(err => {
      console.log('err', err);
    });
	}

	inputChange = (data) => {
		let obj = getVideoId(data.target.value)
			if (obj.hasOwnProperty('id')){
				this.setState({
					videoId: obj.id,
					videoLink: data.target.value
				})
			}
	}

	onProgress = (data) => {
		//console.log('data', data.playedSeconds);
		
	}

	render() {
		const {videoLink, playing} = this.state

	  return (
	    <div className="App" style={{textAlign: 'left', padding: '5px'}}>
	      <input onChange={this.inputChange} />
	      <button
	      	style={{
	      		padding: '0',
						margin: '0 0 10px 0',
						height: '34px',
						fontSize: '17px'
	      	}}
	      	onClick={this.onSelectClick}
	      >
	      	SELECT
	      </button>

	      <ReactPlayer 
	      	url={videoLink} 
	      	playing={playing}
	      	progressInterval={100}
	      	onProgress={this.onProgress}
	      	controls={true}
	      />
	    </div>
	  );
	}
}

export default App;
