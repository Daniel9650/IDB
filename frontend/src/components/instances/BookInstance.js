import React, { Component } from 'react';
import APIError from '../global/APIError.js';
import Loading from '../global/Loading.js';
import NotFound from '../global/NotFound.js';
import RelatedGrid from './RelatedGrid.js';
import $ from "jquery";

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
        url: "http://api.poptopic.org/books/"+id,
        method: "GET",
        success: (data, textStatus, jqXHR)=>{
          this.setState({
            isLoaded: true,
            data: data
          });
        },
        error: (jqXHR, textStatus, errorThrown)=>{
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
