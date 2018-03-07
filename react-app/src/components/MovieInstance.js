import React, { Component } from 'react';
import data from '../data/mock_movie.json';
import {
  Container,
  Jumbotron,
  Button,
  Row } from 'reactstrap';



class MovieInstance extends Component {
	constructor(props) {
    	super(props);
    	this.toggle = this.toggle.bind(this);
    	this.state = {
      		isOpen: false
    	};
  	}
  	toggle() {
    	this.setState({
      	isOpen: !this.state.isOpen
    	});
  	}
	render () {
      var name = data.movie_name;
      var video = "https://www.youtube.com/embed/"+data.trailer_url+"?origin=http://poptopic.org";
      var desc = data.description;
      var date = data.release_date;
      var topics = [];
      var first = true;
      for(var topic in data.topics){
        if(!first)
          topics.push(", ");
        topics.push(<a href="/topics/topic">topic</a>);
        first = false;
      }
      return (
      	<div className="spacing-div">
        <div className="jumbotron instance-tron">
        <Container>
        <h1>{name}</h1>
        <Row>
        <div className="col-sm text-right">
        <div className="youtube-holder">
        <iframe className="youtube-player" type="text/html" width="100%" height="auto" src={video} frameborder="0"/>
        </div>
        </div>
        <div className="col-sm text-left">
        <h6>Movie Description</h6>
        <p>{ desc }</p>
        <h6>Release Date</h6>
        <p>{ date }</p>
        </div>
        </Row>
        <hr className="my-4" />
        <h6>Topics: <small className="text-muted"> {topics} </small> </h6>
        </Container>
        </div>
        </div>
      );
   }

}

export default MovieInstance;