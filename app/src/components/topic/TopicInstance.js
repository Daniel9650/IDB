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
      		isOpen: false
    	};
  	}
  	toggle() {
    	this.setState({
      	isOpen: !this.state.isOpen
    	});
  	}
	render () {

      var name = data.topic_name;

      return (
         <div className="spacing-div">

            <Container>
               <h1 className="general-title">{name}</h1>
               <hr className="divider"/>
               <img className="topic-poster" src={data.poster_url} />
               <br />
               <h6 className="instance-sub">Related Movies</h6>
               <RelatedGrid
                  type="Topics"
                  instances= {data.related_movies}
               />
               <br/>
               <h6 className="instance-sub">Related Music</h6>
               <RelatedGrid
                  type="Music"
                  instances= {data.related_songs}
               />
               <br/>
               <h6 className="instance-sub">Related Books</h6>
               <RelatedGrid
                  type="Books"
                  instances= {data.related_books}
               />
         </Container>
         </div>
      );
   }

}

export default TopicInstance;
