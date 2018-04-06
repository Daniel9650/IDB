import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';


class SearchPage extends Component {

   render(){
      var query = this.props.match.params.query;
      return(
         <div className="spacing-div">
            <Container>
               <SearchBar />
               <h1>Search Results for "{query}"</h1>
               <Row>
                  <Col>
                     <SearchResults query={query} pageNum={1} />
                  </Col>
               </Row>
            </Container>
         </div>
      );
   }
}

export default SearchPage;
