import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CardGrid from './CardGrid.js';
import { withRouter } from "react-router-dom";

/*
   Renders model page, which includes the CardGrid, Pagination, filters, title, and other
   stylistic elements.

   Props:
      type: one of "Movies", "Books", "Topics", of "Music"

*/
class Model extends Component {

   constructor(props) {
      super(props);

      //gets page number from URL so it can be sent to card grid and used in API call
      var args = new URLSearchParams(this.props.location.search);
      var pageArg = args.get('page');
      var pageNum = 1;
      if(pageArg != null && pageArg !== ""){
         try{ pageNum = eval(args.get('page')); }
         catch(e){}
      }

      //sets initial state
      this.state = {page: pageNum};

      this.render = this.render.bind(this);
   }


   render() {
      var name = this.props.type + " Title";
      return (
         <Container className="spacing-div-model">
            <h1 name={name} className="general-title">{this.props.type}</h1>
            <hr className="divider"/>
            <CardGrid
               type={this.props.type}
               pageNum={this.state.page}
            />
         </Container>
      );
   }
}

export default withRouter(Model);
