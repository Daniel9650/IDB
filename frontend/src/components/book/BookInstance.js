import React, { Component } from 'react';

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
     fetch("http://api.poptopic.org/books/"+id)
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

      const {id} = this.props.match.params
      const { error, isLoaded, data } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      }
      else if (!isLoaded) {
        return <div>Loading...</div>;
      }
      else{
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
                     caller_type="books"
                     request_type="Topics"
                     id={id}
                  />
                  <br/>
                  <h6 className="instance-sub">Related Movies</h6>
                  <RelatedGrid
                     caller_type="books"
                     request_type="Movies"
                     id={id}
                  />
                  <br/>
                  <h6 className="instance-sub">Related Music</h6>
                  <RelatedGrid
                     caller_type="books"
                     request_type="Music"
                     id={id}
                  />
            </Container>
            </div>
         );
      }
   }

}

export default BookInstance;
