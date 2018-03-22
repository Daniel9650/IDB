import React, { Component } from 'react';

import data from '../../data/mock_book.json';
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



class BookInstance extends Component {
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

      return (
         <div className="spacing-div">

            <Container>
               <h1 name="book-instance-name" className="general-title">{data.book_name}</h1>
               <hr className="divider"/>
               <Row>
                  <Col xs="auto">
                     <img className="book-poster" src={data.poster_url} />
                  </Col>
                  <Col>
                     <h6 className="instance-sub">Description</h6>
                     <p>{data.description}</p>
                     <h6 className="instance-sub">Author</h6>
                     <p>{data.author}</p>
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
               <h6 className="instance-sub">Related Music</h6>
               <RelatedGrid
                  type="Music"
                  instances= {data.similar_songs}
               />
         </Container>
         </div>
      );
   }

}

export default BookInstance;
