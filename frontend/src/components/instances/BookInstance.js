import React, { Component } from 'react';
import APIError from '../global/APIError.js';
import Loading from '../global/Loading.js';
import NotFound from '../global/NotFound.js';
import RelatedGrid from './RelatedGrid.js';

import {
  Container,
  Row,
  Col
} from 'reactstrap';



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
     const { id } = this.props.match.params;
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
      else{
         var googleBooksLink = "https://books.google.com/books?id=" + data.book_id;
         var authors = data.authors.join(", ")
         return (
            <div className="spacing-div-instance">

               <Container>
                  <h1 name="book-instance-name" className="general-title">{data.book_name}</h1>
                  <hr className="divider"/>
                  <Row>
                     <Col xs="auto">
                        <img className="book-poster" alt="book poster" src={data.poster_url} />
                     </Col>
                     <Col>
                        <h6 className="instance-sub">Description</h6>
                        <p>{data.description}</p>
                        <h6 className="instance-sub">Author</h6>
                        <p>{authors}</p>
                        <h6 className="instance-sub">Release Date</h6>
                        <p>{data.release_date}</p>
                        <h6 className="instance-sub">Find on Google Books</h6>
                        <p>
                           <a href={googleBooksLink}>
                              {googleBooksLink}
                           </a>
                        </p>
                     </Col>
                  </Row>
                  <br />
                  <h6 className="instance-sub">Topics</h6>
                  <RelatedGrid
                     caller_type="books"
                     request_type="Topics"
                     id={data.book_id}
                  />
                  <br/>
                  <h6 className="instance-sub">Related Movies</h6>
                  <RelatedGrid
                     caller_type="books"
                     request_type="Movies"
                     id={data.book_id}
                  />
                  <br/>
                  <h6 className="instance-sub">Related Music</h6>
                  <RelatedGrid
                     caller_type="books"
                     request_type="Music"
                     id={data.book_id}
                  />
            </Container>
            </div>
         );
      }
   }

}

export default BookInstance;
