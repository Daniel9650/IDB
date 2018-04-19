import React, { Component } from 'react';
import NotFound from '../global/NotFound.js';
import RelatedGrid from './RelatedGrid.js';
import APIError from '../global/APIError.js';
import Loading from '../global/Loading.js';
import $ from "jquery";

import {
  Container,
  Row,
  Col
} from 'reactstrap';



class MusicInstance extends Component {
	constructor(props) {
    	super(props);
    	this.toggle = this.toggle.bind(this);
      this.state = {
      		isOpen: false,
          error: null,
          isLoaded: false,
          data: [],
          load_attempts: 0
    	};
      this.request_data = this.request_data.bind(this);
  	}
  	toggle() {
    	this.setState({
      	isOpen: !this.state.isOpen
    	});
  	}
   componentDidMount() {
     this.request_data(5);
  }

  request_data(max_attempts){
    const { id } = this.props.match.params;
     $.ajax({
        url: "http://api.poptopic.org/songs/"+id,
        method: "GET",
        success: (data, textStatus, jqXHR)=>{
          console.log("success");
          this.setState({
            isLoaded: true,
            data: data
          });
        },
        error: (jqXHR, textStatus, errorThrown)=>{
          console.log("in error" + max_attempts);
          if(this.state.load_attempts >= max_attempts){
            this.setState({
              isLoaded: true,
              error: errorThrown
            });
          }
          else{
            this.setState({load_attempts: this.state.load_attempts + 1});
            this.request_data(max_attempts);
          }
        },
        timeout: 1500
      });
  }
	render () {
      const { error, isLoaded, data } = this.state;

      if (error) {
        if(error === "NOT FOUND"){
          return <NotFound />;
        }
        else{
          return(
            <APIError/>
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
                     <img className="poster" alt="album artwork" src={data.poster_url} />
                  </Col>
                  <Col>
                     <div className="youtube-holder">
                        <iframe title="youtube video" className="youtube-player" type="text/html" width="100%" height="auto" src={video} frameBorder="0"/>
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
