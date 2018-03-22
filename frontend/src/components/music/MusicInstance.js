import React, { Component } from 'react';

import data from '../../data/mock_song.json';
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



class MusicInstance extends Component {
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

      //get movie instance data
      var video = "https://www.youtube.com/embed/"+data.youtube_url+"?origin=http://poptopic.org";

      return (
         <div className="spacing-div">

            <Container>
               <h1 name="music-instance-name" className="general-title">{data.music_name}</h1>
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
                     <h6 className="instance-sub">Artists</h6>
                     <p>{data.artists}</p>
                     <h6 className="instance-sub">Album</h6>
                     <p>{data.album}</p>
                  </Col>
                  <Col xs="4" >
                     <h6 className="instance-sub">Release Date</h6>
                     <p>{data.release_date}</p>
                  </Col>
               </Row>
               <br />
               <h6 className="instance-sub">Topics</h6>
               <RelatedGrid
                  type="Topics"
                  instances= {data.topics}
               />
               <br/>
               <h6 className="instance-sub">Related Movies</h6>
               <RelatedGrid
                  type="Movies"
                  instances= {data.similar_movies}
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

export default MusicInstance;
