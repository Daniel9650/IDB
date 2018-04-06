import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import { withRouter } from "react-router-dom";


class SearchPage extends Component {

   constructor(props){
      super(props);
      this.state = {query: ''};
      var args = new URLSearchParams(this.props.location.search);
      this.state.query = args.get('q');
   }

   render(){
      var query = this.state.query;
      return(
         <div className="spacing-div">
            <Container>
               <h1 className="search-title">Search Results for "{query}"</h1>
               <hr className = "divider"/>
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

export default withRouter(SearchPage);
