import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import { withRouter } from "react-router-dom";


class SearchPage extends Component {

   constructor(props){
      super(props);
      this.state = {query: '', page: 1};
      var args = new URLSearchParams(this.props.location.search);
      var pageArg = args.get('page');
      var qArg = args.get('q');
      if(qArg != null && qArg != "")
         this.state.query = args.get('q');
      if(pageArg != null && pageArg != ""){
         try{ this.state.page = eval(args.get('page')); }
         catch(e){}
      }
   }

   render(){
      var query = this.state.query;
      var page = this.state.page;
      return(
         <div className="spacing-div">
            <Container>
               <h1 className="search-title">Search Results for "{query}"</h1>
               <hr className = "divider"/>
               <Row>
                  <Col>
                     <SearchResults query={query} pageNum={page} />
                  </Col>
               </Row>
            </Container>
         </div>
      );
   }
}

export default withRouter(SearchPage);
