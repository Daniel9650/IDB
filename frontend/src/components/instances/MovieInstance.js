import React, { Component } from 'react';
import RelatedGrid from './RelatedGrid.js';
import NotFound from '../global/NotFound.js';
import APIError from '../global/APIError.js';
import Loading from '../global/Loading.js';
import $ from "jquery";

import {
  Container,
  Row,
  Col
} from 'reactstrap';



class MovieInstance extends Component {
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
      this.request_data(2);
    }

    request_data(max_attempts){
      const { id } = this.props.match.params
      var self = this;
      this.setState({load_attempts: this.state.load_attempts + 1});
      $.ajax({
        url: "http://api.poptopic.org/movies/"+id,
        method: "GET",
        success: function(data, textStatus, jqXHR){
          console.log("success");
          self.setState({
            isLoaded: true,
            data: data
          });
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log("in error" + max_attempts);
          if(self.state.load_attempts >= max_attempts){
            self.setState({
              isLoaded: true,
              error: errorThrown
            });
          }
        },
        timeout: 1500,
        complete: function(jqXHR, textStatus){
          if(textStatus == "timeout"){
            if(self.state.load_attempts < max_attempts){
              self.setState({load_attempts: self.state.load_attempts + 1});
              self.request_data(max_attempts);
            }
          }
        }
      });
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
        var video = "https://www.youtube.com/embed/"+data.trailer_url+"?origin=http://poptopic.org";
        var cast = data.cast.join(", ");
        var movieDBLink = "https://www.themoviedb.org/movie/" + data.movie_id;


        var {id} = this.props.match.params;
        return (
           <div className="spacing-div-instance">

              <Container>
                 <h1 name="movie-instance-name" className="general-title">{data.movie_name}</h1>
                 <hr className="divider"/>
                 <Row>
                    <Col xs="auto">
                       <img alt="movie poster" className="poster" src={data.poster_url} />
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
                       <p>{data.description}</p>
                    </Col>
                    <Col xs="4" >
                       <h6 className="instance-sub">Release Date</h6>
                       <p>{data.release_date}</p>
                       <h6 className="instance-sub">Acting</h6>
                       <p>{cast}</p>
                       <h6 className="instance-sub">Directing</h6>
                       <p>{data.director}</p>
                       <h6 className="instance-sub">Find on The Movie Database</h6>
                       <p>
                          <a href={movieDBLink}>
                             {movieDBLink}
                          </a>
                       </p>
                    </Col>
                 </Row>
                 <br />
                 <h6 className="instance-sub">Topics</h6>
                 <RelatedGrid
                    caller_type="movies"
                    request_type="Topics"
                    id = {id}
                 />
                 <br/>
                 <h6 className="instance-sub">Related Music</h6>
                 <RelatedGrid
                    caller_type="movies"
                    request_type="Music"
                    id={id}
                 />
                 <br/>
                 <h6 className="instance-sub">Related Books</h6>
                 <RelatedGrid
                    caller_type="movies"
                    request_type="Books"
                    id={id}
                 />
           </Container>
           </div>
        );
      }
   }

}

export default MovieInstance;
