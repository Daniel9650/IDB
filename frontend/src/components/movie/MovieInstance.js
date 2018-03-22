import React, { Component } from 'react';

import data from '../../data/mock_movie.json';
import RelatedGrid from '../RelatedGrid.js';

import {
  Container,
  Jumbotron,
  Button,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
 CardSubtitle,
 CardBody} from 'reactstrap';



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

      //Todo: fetch related movie json file.
      var movie_id = this.props.id;

      //get movie instance data
      var name = data.movie_name;
      var video = "https://www.youtube.com/embed/"+data.trailer_url+"?origin=http://poptopic.org";
      var desc = data.description;
      var date = data.release_date;
      var tronbg = { backgroundImage: "url("+data.poster_url+")"};
      var bookCards = [];
      var songCards = [];
      var topics = [];
      var first = true;

      return (
         <div className="spacing-div">

            <Container>
               <h1 name="movie-instance-name" className="general-title">{name}</h1>
               <hr className="divider"/>
               <Row>
                  <Col xs="auto">
                     <img className="poster" src={data.poster_url} />
                  </Col>
                  <Col>
                     <div className="youtube-holder">
                        <iframe className="youtube-player" type="text/html" width="100%" height="auto" src={video} frameBorder="0"/>
                     </div>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <h6 className="instance-sub">Description</h6>
                     <p>{desc}</p>
                  </Col>
                  <Col xs="4" >
                     <h6 className="instance-sub">Release Date</h6>
                     <p>{date}</p>
                  </Col>
               </Row>
               <br />
               <h6 className="instance-sub">Topics</h6>
               <RelatedGrid
                  type="Topics"
                  instances= {data.topics}
               />
               <br/>
               <h6 className="instance-sub">Related Music</h6>
               <RelatedGrid
                  type="Music"
                  instances= {data.similar_songs}
               />
               <br/>
               <h6 className="instance-sub">Related Books</h6>
               <RelatedGrid
                  type="Books"
                  instances= {data.similar_books}
               />
         </Container>
         </div>
      );
   }

}

export default MovieInstance;
