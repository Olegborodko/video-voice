import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player'

const getVideoId = require('get-video-id');
const Axios = require('axios');
const Convert = require('xml-js');


class App extends Component {
	inputChange = (data) => {
		let obj = getVideoId(data.target.value)
		if (obj.hasOwnProperty('id')){

			Axios.get(`http://video.google.com/timedtext?lang=ru&v=${obj.id}` , {},
    	{
        headers: {
            "Content-Type": "application/json"
        },
        params: {}
	    })
	    .then((res) => {
	    	if (res['data']){
	    		const objectWithText = Convert.xml2js(res['data'], {});

	    		if (objectWithText.hasOwnProperty('elements')){
	    			const arrayText = objectWithText['elements'][0]['elements']


	    		}

	    	} else {
	    		console.log(res);
	    	}
	    })
	    .catch(err => {
	      console.log(err);
	    });

		}
	}

	render() {
	  return (
	    <div className="App" style={{textAlign: 'left', padding: '20px'}}>
	      <input onChange={this.inputChange} />

	      <ReactPlayer url='https://www.youtube.com/watch?v=bEwE4wyz00o' playing />
	    </div>
	  );
	}
}

export default App;
