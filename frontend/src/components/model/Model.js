import React, { Component } from 'react';
import { Container, Row, ButtonGroup, Button } from 'reactstrap';
import CardGrid from './CardGrid.js';
import { withRouter } from "react-router-dom";


class Model extends Component {

   constructor(props) {
      super(props);
      this.render = this.render.bind(this);
      this.state = {page: 1};
      var args = new URLSearchParams(this.props.location.search);
      var pageArg = args.get('page');
      if(pageArg != null && pageArg != ""){
         try{ this.state.page = eval(args.get('page')); }
         catch(e){}
      }
   }


   render() {
      var name = this.props.type + " Title";
      return (
         <Container className="spacing-div">
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
