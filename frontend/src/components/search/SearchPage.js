import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js'

class SearchPage extends Component {

   render(){
      var query = this.props.match.params.query;
      return(
         <div className="spacing-div">
            <Container>
               <h1>Search Results for "{query}"</h1>
               <Row>
                  <Col>
                     <h1>Topics</h1>
                     <SearchResults type="Topics" query={query} pageNum={1} />
                     <h1>Movies</h1>
                     <SearchResults type="Movies" query={query} pageNum={1}/>
                     <h1>Music</h1>
                     <SearchResults type="Music" query={query} pageNum={1}/>
                     <h1>Books</h1>
                     <SearchResults type="Books" query={query} pageNum={1}/>
                  </Col>
               </Row>
            </Container>
         </div>
      );
   }
}

export default SearchPage;
