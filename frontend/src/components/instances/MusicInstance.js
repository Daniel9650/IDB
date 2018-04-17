import React, { Component } from 'react';
import NotFound from '../global/NotFound.js';
import RelatedGrid from './RelatedGrid.js';
import APIError from '../global/APIError.js';
import Loading from '../global/Loading.js';

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
      		isOpen: false,
          error: null,
          isLoaded: false,
          data: []
    	};
  	}
  	toggle() {
    	this.setState({
      	isOpen: !this.state.isOpen
    	});
  	}
   componentDidMount() {
     const { id } = this.props.match.params
     fetch("http://api.poptopic.org/songs/"+id)
     .then(res => res.json())
     .then(
      (result) => {
         this.setState({
           isLoaded: true,
           data: result
         });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
         this.setState({
           isLoaded: true,
           error
         });
      }
     )
   }
	render () {
      const { error, isLoaded, data } = this.state;

      if (error) {
        const status = error.response ? error.response.status : 500
        if(status === 404){
          return <NotFound />;
        }
        else{
          return(
            <Container className='spacing-div'>
            <APIError/>
            </Container>
            );
        }
      }
      else if (!isLoaded) {
        return (
          <Container className='spacing-div'>
          <Loading/>
          </Container>
          );
      }
      else {

      //get movie instance data
      var video = "https://www.youtube.com/embed/"+data.youtube_url+"?origin=http://poptopic.org";
      var {id} = this.props.match.params;
      var spotifyLink = "https://open.spotify.com/track/" + data.song_id;
      return (
         <div className="spacing-div-instance">

            <Container>
               <h1 name="music-instance-name" className="general-title">{data.song_name}</h1>
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
                     <h6 className="instance-sub">Find on Spotify</h6>
                     <p>
                       <a href={spotifyLink}>
                           {spotifyLink}
                       </a>
                     </p>
                  </Col>
               </Row>
               <br />
               <h6 className="instance-sub">Topics</h6>
               <RelatedGrid
                  caller_type="songs"
                  request_type="Topics"
                  id = {id}
               />
               <br/>
               <h6 className="instance-sub">Related Movies</h6>
               <RelatedGrid
                  caller_type="songs"
                  request_type="Movies"
                  id={id}
               />
               <br/>
               <h6 className="instance-sub">Related Books</h6>
               <RelatedGrid
               caller_type="songs"
                  request_type="Books"
                  id={id}
               />
         </Container>
         </div>
      );
   }
   }

}

export default MusicInstance;
