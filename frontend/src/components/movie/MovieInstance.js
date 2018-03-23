import React, { Component } from 'react';
import axios from 'axios'
import RelatedGrid from '../RelatedGrid.js';
import NotFound from '../NotFound.js';

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
      fetch("http://api.poptopic.org/movies/"+id)
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
        return <NotFound />;
      }
      else if (!isLoaded) {
        return <div>Loading...</div>;
      }
      else {
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

        var {id} = this.props.match.params;
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
