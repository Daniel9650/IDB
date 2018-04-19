import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import SearchResults from './SearchResults.js';
import { withRouter } from "react-router-dom";
import Sort from '../model/filters/Sort.js';


class SearchPage extends Component {

   constructor(props){
      super(props);
      this.state = {
        query: '',
        page: 1,
      };
      var args = new URLSearchParams(this.props.location.search);
      var pageArg = args.get('page');
      var qArg = args.get('q');
      if(qArg != null && qArg !== "")
         this.state.query = args.get('q');
      if(pageArg != null && pageArg !== ""){
         try{ this.state.page = eval(args.get('page')); }
         catch(e){}
      }


   }



   render(){

      return(
         <div className="spacing-div">
            <Container>
              <SearchResults query={this.state.query} pageNum={this.state.page} />
            </Container>
         </div>
      );
   }
}

export default withRouter(SearchPage);
