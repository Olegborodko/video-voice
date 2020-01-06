import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player'

const getVideoId = require('get-video-id');
const Axios = require('axios');
const Convert = require('xml-js');


class App extends Component {
	state = {
		videoId: null,
		objectText: null,
		videoLink: null
	}

	onSelectClick = () => {
		let videoId = this.state.videoId
		console.log('videoId',videoId)

		


		// Axios.get(`http://video.google.com/timedtext?type=list&v=${videoId}`, {},
		// {
		// 	headers: {
  //         "Content-Type": "application/json"
  //     },
  //     params: {}
		// })
		// .then((res) => {
		// 	if (res && res.data){
		// 		console.log(JSON.stringify(Convert.xml2js(res['data'], {})))
		// 	}
		// })
		// .catch(err => {
  //     console.log(err);
  //   });

		// Axios.get(`http://video.google.com/timedtext?lang=ru&v=${videoId}` , {},
  // 	{
  //     headers: {
  //         "Content-Type": "application/json"
  //     },
  //     params: {}
  //   })
  //   .then((res) => {
  //   	console.log(res)
  //   	if (res['data']){
  //   		const objectWithText = Convert.xml2js(res['data'], {});

  //   		if (objectWithText.hasOwnProperty('elements')){
  //   			const arrayText = objectWithText['elements'][0]['elements']
  //   			let newObj = {}
  //   			arrayText.forEach((obj) => {
  //   				if (!newObj[obj['attributes']['start']]){
  //   					newObj[obj['attributes']['start']] = {}	
  //   				}
  //   				newObj[obj['attributes']['start']] = {
  //   					dur: obj['attributes']['dur'],
  //   					text: obj['elements'][0]['text']
  //   				}
  //   			})

  //   			this.setState({
  //   				objectText: newObj
  //   			})
    			
  //   			console.log('newObj', newObj);
  //   		}

  //   	} else {
  //   		console.log(res);
  //   	}
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
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

	render() {
		const {videoLink} = this.state

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

	      <ReactPlayer url={videoLink} playing />
	    </div>
	  );
	}
}

export default App;
