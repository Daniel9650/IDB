import React, { Component } from 'react';

import data from '../../data/mock_topic.json';
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



class TopicInstance extends Component {
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
     fetch("http://api.poptopic.org/topics/"+id)
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

      const {id} = this.props.match.params;
      if (error) {
        return <div>Error: {error.message}</div>;
      }
      else if (!isLoaded) {
        return <div>Loading...</div>;
      }
      else {
         var name = data.topic_name;

         return (
            <div className="spacing-div">

               <Container>
                  <h1 name="topic-instance-name" className="general-title">{name}</h1>
                  <hr className="divider"/>
                  <img className="topic-poster" src={data.poster_url} />
                  <br />
                  <h6 className="instance-sub">Related Movies</h6>
                  <RelatedGrid
                     caller_type="topics"
                     request_type="Movies"
                     id={id}
                   />
                  <br/>
                  <h6 className="instance-sub">Related Music</h6>
                  <RelatedGrid
                     caller_type="topics"
                     request_type="Music"
                     id={id}
                  />
                  <br/>
                  <h6 className="instance-sub">Related Books</h6>
                  <RelatedGrid
                     caller_type="topics"
                     request_type="Books"
                     id={id}
                  />
            </Container>
            </div>
         );
      }
   }

}

export default TopicInstance;
